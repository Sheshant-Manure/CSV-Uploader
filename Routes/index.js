const express = require('express');
const Router = express.Router();
const indexPageCtrl = require('../Controllers/index_page_controller');

Router.get('/', indexPageCtrl.indexPage);

module.exports = Router;