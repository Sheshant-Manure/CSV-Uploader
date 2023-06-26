const express = require('express');
const Router = express.Router();
const indexPageCtrl = require('../Controllers/index_page_controller');
const viewFilesCtrl = require('../Controllers/view_files_controller');

Router.get('/', indexPageCtrl.indexPage);
Router.use('/users', require('./users'));
Router.use('/uploads', require('./uploads'));
Router.use('/files/:filename', viewFilesCtrl.viewCSV);

module.exports = Router;