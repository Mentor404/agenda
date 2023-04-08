const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const HomeModel = mongoose.model('Home', HomeSchema);

module.exports = HomeModel;
