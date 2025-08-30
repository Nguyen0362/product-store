const Product = require("../../model/product.model");
const ProductCategory = require("../../model/product-category.model");
const Account = require("../../model/account.model");

module.exports.index = async (req, res) => {
  const statistic = {
    productCategory: {
      total: 0,
      active: 0,
      inactive: 0
    },
    product: {
      total: 0,
      active: 0,
      inactive: 0
    },
    admin: {
      total: 0,
      active: 0,
      inactive: 0
    }
  }

  // product category
  statistic.productCategory.total = await ProductCategory.countDocuments({
    deleted: false
  });

  statistic.productCategory.active = await ProductCategory.countDocuments({
    status: "active",
    deleted: false
  });

  statistic.productCategory.inactive = await ProductCategory.countDocuments({
    status: "inactive",
    deleted: false
  });
  // end product category

  // product category
  statistic.product.total = await Product.countDocuments({
    deleted: false
  });

  statistic.product.active = await Product.countDocuments({
    status: "active",
    deleted: false
  });

  statistic.product.inactive = await Product.countDocuments({
    status: "inactive",
    deleted: false
  });
  // end product category

  // product category
  statistic.admin.total = await Account.countDocuments();

  statistic.admin.active = await Account.countDocuments({
    status: "active",
    deleted: false
  });

  statistic.admin.inactive = await Account.countDocuments({
    status: "inactive",
    deleted: false
  });
  // end product category

  res.render("admin/pages/dashboards/index", {
    pageTitle: "Trang tổng quan",
    statistic: statistic
  });
} 