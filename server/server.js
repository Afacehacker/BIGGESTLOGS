const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const http = require('http');
const initSocket = require('./utils/socket');

// Route files
const accountRoutes = require('./routes/accountRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'https://biggestlogs.vercel.app',
            'http://localhost:5173',
            'http://localhost:3000',
            'http://localhost:5174'
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            console.log('Origin not allowed by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
}));

// Initialize Socket.io
const io = initSocket(server);

// Make io accessible in routes if needed
app.set('socketio', io);

app.use(express.json());

// Routes
app.use('/api/accounts', accountRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/chats', chatRoutes);

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
});
