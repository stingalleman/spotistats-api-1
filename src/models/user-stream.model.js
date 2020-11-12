const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserStreamSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  track: {
    id: String,
    name: String,
    durationMs: Number,
    album: String,
    artists: [
      String,
    ],
  },
  plays: [{
    playedAt: Date,
    context: String,
  }],
}, { timestamps: false });

module.exports = mongoose.model('UserStream', UserStreamSchema);
