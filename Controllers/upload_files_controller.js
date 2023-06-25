const fs = require('fs');
const csv = require('csv-parser');
const CSV = require('../Models/csv_schema');
const path = require('path');

module.exports.uploadCSV = (req, res) => {
    try {
      console.log(req.file);
        if (!req.file) {
          // handle error if file not present
          return res.status(400).send('No files were uploaded.');
        }
    
        if (req.file.mimetype !== 'text/csv') {
          // handle error if file is not CSV
          return res.status(400).send('Only CSV files are allowed.');
        }
      
        //parser the uploaded csv file and store it in array
        const results = [];
        fs.createReadStream(req.file.path)
          .pipe(csv())
          .on('data', (data) => {
            results.push(data);
          })
          .on('end', async () => {
            //save csv data to db
            if (req.file) {
              const oldPath = req.file.path;
              const newPath = path.join(__dirname, '../Uploads', req.file.originalname);
              fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
              });
              const csvData = new CSV({
                filename: req.file.originalname,
                header_row: results[0],
                data_rows: results.slice(1),
                // path: newPath
              });
              await csvData.save();
            } else {
              res.status(400).send('No file uploaded');
            }
            
            return res.redirect('back');
          });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}