const fs = require('fs');
const path = require('path');

module.exports.viewCSV = (req, res) => {
    const filename = req.params.filename;
    const csvFileDirectory = path.join(__dirname, '../Uploads');
    const csvFile = path.join(csvFileDirectory, filename);

    let header, row_data = [];
    const filedata = fs.readFile(csvFile, 'utf8', (err, data)=>{
        if (err) {
            console.log(err);
        } 
        else {
            const rows = data.trim().split('\n');
            header = rows[0].split(',');
            for(let i=1; i<rows.length;i++)
            {
                row_data.push(rows[i].split(','));
            }
            return res.render('csv_viewer', {
                title: 'CSV Uploader | File Viewer',
                header: header,
                rows: row_data
            });
        }
    });
}