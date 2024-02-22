const mongoose = require('mongoose')
const { Schema } = mongoose

const trackSchema = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    foodID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foods',
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min: 1
    },
    eatenAt:{
        type: String,
        default: new Date().toLocaleDateString()
    }
},{timestamps:true}) 

const trackModel = mongoose.model('tracks',trackSchema)
module.exports = trackModel