// Format: module.exports.actionName = function() { body/definition }


// Rendering the index.ejs page upon localhost:8000/ request
module.exports.indexPage = (req, res)=> { 
    return res.render('index',{
        title: 'CSV Uploader'
    });
};