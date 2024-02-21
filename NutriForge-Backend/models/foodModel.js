const mongoose = require('mongoose');
const {Schema} = mongoose;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    calories: {
        type: Number,
        required: true,
        min: 0
    },
    protein: {
        type: Number,
        required: true,
        min: 0
    },
    carbohydrates: {
        type: Number,
        required: true,
        min: 0
    },
    fat: {
        type: Number,
        required: true,
        min: 0
    },
    fiber:{
        type: Number,
        required: true,
        min: 0
    },
},{
    timestamps: true
});

const foodModel = mongoose.model('foods', foodSchema);
module.exports = foodModel;