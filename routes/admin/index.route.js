const dashboardRoute = require('./dashboard.route');
const productsRoute = require('./product.route');
const authRoute = require('./auth.route');
const productsCategoryRoute = require('./product-category.route');
const accountsRoute = require('./account.route');
const rolesRoute = require('./role.route');
const chatsRoute = require('./chat.route')
const bannerCaregoryRoute = require('./banner-category.route');
const bannerRoute = require('./banner.route');

const systemConfig = require('../../config/system');
const authMiddleware = require('../../middleware/auth.middleware');

module.exports = (app) => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use((req, res, next) => {
      res.locals.currentPath = req.path;
      next();
    });


    app.use(
      `${PATH_ADMIN}/dashboards`, 
      authMiddleware.requiredAuth,
      dashboardRoute
    );

    app.use(
      `${PATH_ADMIN}/products-category`,
      authMiddleware.requiredAuth,
      productsCategoryRoute
    );

    app.use(
      `${PATH_ADMIN}/products`,
      authMiddleware.requiredAuth,
      productsRoute
    );

    app.use(
      `${PATH_ADMIN}/auths`,
      authRoute
    );

    app.use(
      `${PATH_ADMIN}/accounts`,
      authMiddleware.requiredAuth,
      accountsRoute
    );

    app.use(
      `${PATH_ADMIN}/roles`,
      authMiddleware.requiredAuth,
      rolesRoute
    );

    app.use(
      `${PATH_ADMIN}/chats`,
      authMiddleware.requiredAuth,
      chatsRoute
    );

    app.use(
      `${PATH_ADMIN}/banner-category`,
      authMiddleware.requiredAuth,
      bannerCaregoryRoute
    );

    app.use(
      `${PATH_ADMIN}/banners`,
      authMiddleware.requiredAuth,
      bannerRoute
    );
}