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
    duration_ms: Number,
    album: String,
    artists: [
      String,
    ],
  },
  plays: [{
    played_at: Date,
    context: String,
  }],
}, { timestamps: false });

module.exports = mongoose.model('UserStream', UserStreamSchema);
