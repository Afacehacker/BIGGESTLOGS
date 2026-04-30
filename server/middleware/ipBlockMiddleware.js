const BlockedIP = require('../models/BlockedIP');

const checkBlockedIp = async (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    
    // Optional: Log IP for debugging if needed
    // console.log('Checking IP:', ip);
    
    if (ip) {
        try {
            const blocked = await BlockedIP.findOne({ ip });
            if (blocked) {
                console.log(`[BLOCKED] Request from blocked IP attempted: ${ip}`);
                return res.status(403).json({ message: 'Your IP address has been blocked from accessing this site.' });
            }
        } catch (error) {
            console.error('Error checking blocked IP:', error);
        }
    }
    
    next();
};

module.exports = { checkBlockedIp };
