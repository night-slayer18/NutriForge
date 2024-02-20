const mongoose = require('mongoose');
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;