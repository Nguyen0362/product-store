const Product = require("../../model/product.model");
const ProductCategory = require("../../model/product-category.model");
const Banner = require("../../model/banner.model");

module.exports.index = async (req, res) => {
  // product featured
  const productFeatured = await Product
  .find({
    deleted: false,
    status: "active",
    featured: 1
  })
  .sort({
    position: "desc"
  })
  .limit(6)

  for(const product of productFeatured){
    product.priceNew = (1 - product.discountPercentage/100) * product.price;
  }
  // end product featured

  // banner
  // banner slide
  const banners = {};

  const bannerSlideLeft = await Banner.findOne({
    position: "home_hero_left",
    deleted: false,
    status: "active"
  })

  const bannerSlideRight = await Banner.findOne({
    position: "home_hero_right",
    deleted: false,
    status: "active"
  })

  banners["bannerSlideLeft"] = bannerSlideLeft;
  banners["bannerSlideRight"] = bannerSlideRight;

  // banner sub
  const bannerSubLeft = await Banner.findOne({
    position: "home_sub_left",
    deleted: false,
    status: "active"
  });

  const bannerSubRightTop = await Banner.findOne({
    position: "home_sub_right_top",
    deleted: false,
    status: "active"
  });

  const bannerSubRightBottom = await Banner.findOne({
    position: "home_sub_right_bottom",
    deleted: false,
    status: "active"
  });

  banners["bannerSubLeft"] = bannerSubLeft;
  banners["bannerSubRightTop"] = bannerSubRightTop;
  banners["bannerSubRightBottom"] = bannerSubRightBottom;

  // banner promotion 
  const bannerPromotion = await Banner.findOne({
    position: "home_promotion",
    deleted: false,
    status: "active"
  })
  banners["bannerPromotion"] = bannerPromotion;

  // end banner

  // new arrivals
  const now = new Date();
  const sevenDaysAgo = new Date(now.setDate(now.getDate() - 30));

  const newArrivals = await Product
  .find({
    createdAt: { $gte: sevenDaysAgo },
    deleted: false,
    status: "active"
  })
  .sort({
    position: "desc"
  })
  .limit(8)

  if(newArrivals.length > 0){
    const dayNow = new Date();

    for(const item of newArrivals){
      const category = await ProductCategory.findOne({
        _id: item.category_id,
        deleted: false
      });

      const priceNew = item.price * (1 - item.discountPercentage / 100);

      const dayAgo = Math.floor((dayNow - new Date(item.createdAt)) / (24 * 60 * 60 * 1000));

      item.priceNew = priceNew;
      item.category = category;
      item.dayAgo  = dayAgo
    }
  }
  // end new arrivals

  //product lastest
  const productsLastest = await Product
  .find({
    deleted: false,
    status: "active"
  })
  .sort({
    position: "desc"
  })
  .limit(10)

  if(productsLastest.length > 0){
    const dayNow = new Date();

    for(const item of productsLastest){
      const category = await ProductCategory.findOne({
        _id: item.category_id,
        deleted: false
      });

      const priceNew = item.price * (1 - item.discountPercentage / 100);

      const dayAgo = Math.floor((dayNow - new Date(item.createdAt)) / (24 * 60 * 60 * 1000));

      item.priceNew = priceNew;
      item.category = category;
      item.dayAgo  = dayAgo
    }
  }
  //end product lastest

  res.render("client/pages/homes/index", {
    pageTitle: "Trang chủ",
    productFeatured: productFeatured,
    banners: banners,
    newArrivals: newArrivals,
    productsLastest: productsLastest
  });
}