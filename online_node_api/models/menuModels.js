var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number },
    shop: { type: Schema.Types.ObjectId, ref: "shops" },
  },
  {
    collection:'menus',
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// schema.virtual("price_vat").get(function () {
//   return (this.price * 0.07) + this.price;
// });

const menu = mongoose.model("Menu", schema);

module.exports = menu;
