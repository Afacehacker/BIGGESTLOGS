const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { checkBlockedIp } = require('./middleware/ipBlockMiddleware');

const http = require('http');
const https = require('https');
const initSocket = require('./utils/socket');

// ── Keep-alive: prevent Render / free-tier hosts from sleeping ──────────────
// Pings the server's own /api/ping endpoint every 4 minutes so the dyno never
// goes idle. Falls back gracefully if RENDER_EXTERNAL_URL is not set.
function startKeepAlive(port) {
    const PING_INTERVAL_MS = 4 * 60 * 1000; // 4 minutes

    // Render sets this env var automatically; fall back to localhost for local dev
    const baseUrl =
        process.env.RENDER_EXTERNAL_URL ||
        `http://localhost:${port}`;

    const pingUrl = `${baseUrl}/api/ping`;
    const transport = pingUrl.startsWith('https') ? https : http;

    setInterval(() => {
        transport.get(pingUrl, (res) => {
            console.log(`[keep-alive] ping → ${pingUrl} | status: ${res.statusCode}`);
        }).on('error', (err) => {
            console.error('[keep-alive] ping failed:', err.message);
        });
    }, PING_INTERVAL_MS);

    console.log(`[keep-alive] Self-ping scheduled every ${PING_INTERVAL_MS / 60000} min → ${pingUrl}`);
}

// ── Global crash guards ─────────────────────────────────────────────────────
process.on('uncaughtException', (err) => {
    console.error('[uncaughtException]', err);
    // Keep the process alive; log the error but don't exit
});

process.on('unhandledRejection', (reason) => {
    console.error('[unhandledRejection]', reason);
    // Keep the process alive; log the reason but don't exit
});

// Route files
const accountRoutes = require('./routes/accountRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const chatRoutes = require('./routes/chatRoutes');
const settingRoutes = require('./routes/settingRoutes');

dotenv.config();

connectDB();

const app = express();

// Trust the reverse proxy (e.g., Render, Heroku) so req.ip has the client's real IP
app.set('trust proxy', 1);

const allowedOrigins = [
    'https://biggestlogs.vercel.app',
    'https://biggestlogg.com.ng',
    'https://www.biggestlogg.com.ng',
    'http://biggestlogg.com.ng',
    'http://www.biggestlogg.com.ng',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000'
];

// 1. ABSOLUTE TOP - CORS Configuration
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, false); // Return false instead of throwing error to avoid unhandled rejections
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// 2. Handle Preflight for all routes
app.options('*', cors());

const server = http.createServer(app);

// Initialize Socket.io
const io = initSocket(server);

// Make io accessible in routes if needed
app.set('socketio', io);

app.use(express.json());
app.use(checkBlockedIp);

// Routes
app.use('/api/accounts', accountRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/settings', settingRoutes);


// Health check endpoint for keeping the server awake
app.get('/api/ping', (req, res) => {
    res.status(200).json({ status: 'alive', time: new Date() });
});

// Root route
app.get('/', (req, res) => {
    res.send('BIGGESTLOGS API is running... ⚡');
});

// --- Production Setup ---
// The frontend is deployed separately on Vercel, so we don't serve static files here.
// -----------------------


// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    startKeepAlive(PORT);
});
