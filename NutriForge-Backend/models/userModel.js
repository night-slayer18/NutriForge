const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;