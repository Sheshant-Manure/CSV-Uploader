const express = require('express');
const Router = express.Router();
const indexPageCtrl = require('../Controllers/index_page_controller');

Router.get('/', indexPageCtrl.indexPage);
Router.use('/users', require('./users'));
Router.use('/uploads', require('./uploads'));

module.exports = Router;