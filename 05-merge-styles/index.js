const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const allStyles = [];

fs.readdir(stylesPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log('erroe: ', err);
  } else {
    files.forEach((item) => {
      if (path.extname(item.name) === '.css') {
        const itemPath = path.join(stylesPath, item.name);
        fs.readFile(itemPath, 'utf-8', (err, data) => {
          if (err) {
            console.log('error: ', err);
          } else {
            allStyles.push(data);

            fs.appendFile(bundlePath, allStyles.join(''), (err) => {
              if (err) {
                console.log('error: ', err);
              }
            });
          }
        });
      }
    });
  }
});
