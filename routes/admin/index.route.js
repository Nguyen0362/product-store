const dashboardRoute = require('./dashboard.route');
const productsRoute = require('./product.route');

const systemConfig = require('../../config/system');

module.exports = (app) => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use((req, res, next) => {
        res.locals.currentPath = req.originalUrl;
        next();
    });


    app.use(`${PATH_ADMIN}/dashboards`, dashboardRoute);

    app.use(`${PATH_ADMIN}/products`, productsRoute);
}