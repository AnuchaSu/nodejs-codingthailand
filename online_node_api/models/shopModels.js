var mongoose = require("mongoose");

var schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: "nopic.png" },
    location: {
      lat: Number,
      lgn: Number,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);

schema.virtual("menus", {
  ref: "Menu",
  localField: "_id",
  foreignField: "shop",
});

const shop = mongoose.model("shops", schema);

module.exports = shop;
