const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  files.forEach((item) => {
    const filePath = path.join(folderPath, item.name);
    if (item.isFile()) {
      const type = path.extname(filePath).slice(1);
      const name = path.basename(filePath, `.${type}`);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error:', err);
          return;
        }
        console.log(`${name} - ${type || 'unknown'} - ${stats.size} bytes`);
      });
    }
  });
});
