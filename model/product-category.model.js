const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productCategory = ({
  title: String,
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  parent_id: String,
  description: String,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
    type: Boolean,
    default: false
  }
});

const ProductCategory = mongoose.model('ProductCategory', productCategory, 'product-category');
module.exports = ProductCategory;