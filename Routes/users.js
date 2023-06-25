const express = require('express');
const userController = require('../Controllers/usersController');
const Router = express.Router();

// Sign Up Routing
Router.post('/create-account', userController.createAccount);
Router.get('/create-account', userController.new_user_page); // Incase link is copied and searched in browser, then get request is submitted

// Sign In Routing
Router.post('/sign-in', userController.signIn);
Router.get('/sign-in', userController.signInGetReq);

// Sign Out Routing
Router.get('/sign-out', userController.signOut);

module.exports = Router;