const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  tokens: Number,
  purchases: [
    {
      assetId: String,
      unlocked: Boolean,
      timestamp: Date
    }
  ],
  screenshotBlocked: Boolean
});

module.exports = mongoose.model('User', userSchema);
