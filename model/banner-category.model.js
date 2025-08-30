const mongoose = require('mongoose');
const bannerCategorySchema = new mongoose.Schema({
  title: String,
  description: String,
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const BannerCategory = mongoose.model("BannerCategory", bannerCategorySchema, "banner-category");
module.exports = BannerCategory;