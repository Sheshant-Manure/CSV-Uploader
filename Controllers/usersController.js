const User = require('../Models/users');
const CSV = require('../Models/csv_schema');

// Format: module.exports.actionName = function() { body/definition }

module.exports.createAccount = (req, res) => {
  
    // If the password and confirm password do not match, then render the error page
   if(req.body.password != req.body.confirm_password){
    return res.render('password_error',{
        title: 'CSV Uploader | Password Error'
    });
    }
    
    // Creating the user account with entered data via sign up form
    User.create(
        {
            username: req.body.username,
            email: req.body.email,
            password : req.body.password
        }
    );
    res.render('new_user', {
        title: 'CSV Uploader | New User'
    });
}

module.exports.new_user_page = (req, res) => {
    res.render('new_user', {
        title: 'CSV Uploader | New User'
    });  
}

let user, csv;
module.exports.signIn = async(req, res) => {
    user = await User.find({
        $or: [
          { username: req.body.email_or_username },
          { email: req.body.email_or_username }
        ]
      });

    csv = await CSV.find({});
    if (req.body.password === user[0].password)
    {
        // Set the session variables
        req.session.SignIn = true;
        req.session.Username = user[0].username;
        return res.render('home',{
            title:'CSV Uploader | Home Page',
            user_name: user[0].username,
            files: csv
        });
    }
    else if (req.session.SignIn === false)
    {

        return res.render('index',{
            title:'CSV Uploader',
        });
    }
    else
    {
        return res.render('index',{
            title:'CSV Uploader',
        });
    }
}

module.exports.signInGetReq = (req, res) => {
    if(req.session.SignIn === true)
    {
        return res.render('home',{
            title:'CSV Uploader | Home Page',
            user_name: user[0].username,
            files: csv
        });
    }
    else
    {
        return res.render('index',{
            title:'CSV Uploader',
        });
    }
}

module.exports.signOut = (req, res) => {
// Destroy the session
req.session.destroy((err) => {
    if (err) {
    console.log('Error while destroying session:', err);
    }
    // Redirect the user after destroying the session
    res.redirect('/');
});   
}