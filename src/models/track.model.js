const mongoose = require('mongoose');

const { Schema } = mongoose;

const TrackSchema = new Schema({
  trackId: {
    type: String,
    required: true,
  },
  name: String,
  durationMs: Number,
  albumId: String,
  // images: [
  //   String,
  // ],
  explicit: Boolean,
  artistIds: [
    String,
  ],
}, { timestamps: false });

module.exports = mongoose.model('Track', TrackSchema);
