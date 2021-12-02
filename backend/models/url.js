const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: true,
    unique: true,
  },
  short: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("url", urlSchema);
