const BlockedIP = require('../models/BlockedIP');

const checkBlockedIp = async (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    
    if (ip) {
        try {
            const blocked = await BlockedIP.findOne({ ip });
            if (blocked) {
                return res.status(403).json({ message: 'Your IP address has been blocked from accessing this site.' });
            }
        } catch (error) {
            console.error('Error checking blocked IP:', error);
        }
    }
    
    next();
};

module.exports = { checkBlockedIp };
