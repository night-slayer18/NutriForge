const mongoose = require('mongoose')
const { Schema } = mongoose

const trackSchema = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    foodID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foods'
    },
    quantity:{
        type: Number,
        required: true,
        min: 1
    },
},{timestamps:true}) 

const trackModel = mongoose.model('tracks',trackSchema)
module.exports = trackModel