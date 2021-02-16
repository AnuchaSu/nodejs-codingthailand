var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  salary: { type: Number },
  created: { type: Date, default: Date.now },
});

const staff = mongoose.model("staffs", schema);

module.exports = staff;
