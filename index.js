const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

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

// Setting Routes folder for routing all the urls requested by the client (browser)
app.use('/', require('./Routes/index'));

// Running the express server
const port = 8000
app.listen(port, () => {
  console.log(`Server running at localhost:${port}`)
})
