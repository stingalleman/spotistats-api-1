const mongoose = require('mongoose');

const { Schema } = mongoose;

// const Track = require('./track.model');

const StreamSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  track: {
    type: mongoose.Types.ObjectId,
    ref: 'Track',
    required: true,
  },
  streamCount: Number,
  streams: [{
    playedAt: Date,
    context: String,
  }],
}, { timestamps: false });

module.exports = mongoose.model('Stream', StreamSchema);
