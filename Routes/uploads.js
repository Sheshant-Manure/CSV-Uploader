const express = require('express');
const Router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'Uploads/'})
const userController = require('../Controllers/upload_files_controller');

Router.post('/csvfile', upload.single('csv'), userController.uploadCSV);

module.exports = Router;