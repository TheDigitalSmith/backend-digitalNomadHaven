const mongoose = require ('mongoose');

const reviewSchema = new mongoose.Schema({
    //userId: {type: mongoose.Schema.Types.ObjectId, ref: user}
    userId: String,
    //placeId: {type: mongoose.Schema.Types.ObjectId, ref: place}
    placeId: String,
    description: String,
    wifiRate: Number,
    serviceRate: Number,
}, {timestamps:true})

const review = mongoose.model('review', reviewSchema);

module.exports = review;