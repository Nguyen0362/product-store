const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    title: String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    category_id: String,
    featured: {
        type: String,
        default: "0"
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    quantity: Number,
    thumbnail: Array,
    position: Number,
    status: String,
    createdBy: String,
    createdAt: Date,
    updatedBy: String,
    updatedAt: Date,
    deletedBy: String,
    deletedAt: Date,
    deleted: {
      type: Boolean,
      default: false
    }
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;