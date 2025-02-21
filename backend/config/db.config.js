const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed');
        console.error(error);
    }
};
