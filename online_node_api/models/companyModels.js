var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: String,
  address: {
    province: String,
  },
});

const company = mongoose.model("Companys", schema);

module.exports = company;