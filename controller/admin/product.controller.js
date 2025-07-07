const Product = require('../../model/product.model');

module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    const products = await Product.find(find);

    res.render('admin/pages/products/index', {
        pageTitle: 'Trang sản phẩm',
        products: products
    });
}

//Thêm mới sản phẩm
module.exports.create = (req, res) => {
    res.render('admin/pages/products/create', {
        pageTitle: 'Thêm mới sản phẩm'
    })
}

module.exports.createPost = (req, res) => {
    req.body.price = parseInt(req.body.price);

}
// End thêm mới sản phẩm
