const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');  // This is used for url encoding the post request made via forms using post method
const session = require('express-session');
const app = express();

// Using Mongoose ODM to connect with MongoDB Atlas
main().catch(err => console.log(err));
    async function main() {
      await mongoose.connect('mongodb+srv://msheshant1997:Sheshant123@cluster.h40pfxp.mongodb.net/');
}

// The html form data should be encoded in the url using the body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Setting up the EJS view engine 
app.set('view engine', 'ejs');
app.set('views', './Views'); // The http requests will be routed to the 'Views' directory wherein all the pages and subpages are stored

// Setting 'Assets' folder as directory for static files (CSS, JS and Images)
app.use(express.static('./Assets'));

// Extract the styles and scripts from subpages into the layout page
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Using express ejs layouts library
// This must be executed before the routes so that before rendering pages from the views, a layout is predefined for all of them
app.use(expressLayouts);

// Using express session middllware for local authentication
app.use(session({
  secret:'csv-uploader',
  resave: false,
  saveUninitialized:false
}))

// Setting Routes folder for routing all the urls requested by the client (browser)
app.use('/', require('./Routes/index'));

// Running the express server
const port = 8000
app.listen(port, () => {
  console.log(`Server running at localhost:${port}`)
})
