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

const placeSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
    posterId: String,
    Types: [
      {
        type: String,
        required: true,
      },
    ],
    Website: {
      type: String,
      required: false,
    },
    Description: {
      type: String,
      required: false,
    },
    OpenHours: {
      type: Array,
      required: true,
    },
    Pictures: [
      {
        type: String,
        required: true,
        default:
          'https://images.unsplash.com/photo-1492158244976-29b84ba93025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
      },
    ],
    OpenNight: {
      type: Boolean,
      required: false,
    },
})
const reviewCollection = mongoose.model('review', reviewSchema);
const placeCollection = mongoose.model('place', placeSchema);
module.exports = {
    reviewCollection, placeCollection
}