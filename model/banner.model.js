const mongoose = require('mongoose');
const bannerSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  thumbnail: Array,
  button_text: String,
  description: String,
  category_id: String,
  link: String,
  status: String,
  position: String,
  createdBy: String,
  createdAt: Date,
  updatedBy: String,
  updatedAt: Date,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedBy: String,
  deletedAt: Date
});

const Banner = mongoose.model("Banner", bannerSchema, "banners");
module.exports = Banner;