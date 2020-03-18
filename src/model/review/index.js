const mongoose = require ('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: String,
    placeId: String,
    description: String,
    wifiRate: Number,
    serviceRate: Number,
}, {timestamps:true})

const review = mongoose.model('review', reviewSchema);

module.exports = review;