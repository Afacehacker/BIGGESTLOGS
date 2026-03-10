const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const seedAdmin = async () => {
    try {
        await User.deleteMany({ email: 'admin@biggestlogs.com' });

        const admin = new User({
            name: 'System Admin',
            email: 'admin@biggestlogs.com',
            password: 'admin123',
            isAdmin: true,
        });

        await admin.save();
        console.log('Admin User Created Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
