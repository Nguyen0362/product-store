const express = require('express');
require('dotenv').config();
const path = require('path');
const systemConfig = require('./config/system');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT;

const database = require('./config/database');
database.connect();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//flash
app.use(cookieParser('KDHJDBD'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(methodOverride('_method'));

app.locals.prefixAdmin = systemConfig.prefixAdmin;

const routeAdmin = require('./routes/admin/index.route');
routeAdmin(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});