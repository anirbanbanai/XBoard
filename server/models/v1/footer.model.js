const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const linkSchema = new Schema({
  heading: { type: String },
  detail: { type: String },
  url: { type: String },
  price: { type: String},
  options: { type: [String], default: [] }
});

const footerSchema = new Schema({
  services: [linkSchema],
  legal: {
    terms:[linkSchema],
    policy:[linkSchema],
    faq:[linkSchema]
  },
  pricing: [linkSchema],
});

const Footer = mongoose.model("Footer", footerSchema);

module.exports = Footer;
