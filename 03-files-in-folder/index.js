const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
    return;
  } else {
    const result = [];
    let len = 0;
    files.forEach((item) => {
      const filePath = path.join(folderPath, item.name);
      const indexComa = item.name.lastIndexOf('.');
      const name = item.name.slice(0, indexComa);
      //const lastName = item.name.slice(indexComa + 1);
      const lastName =
        path.extname(item.name).slice(1) || 'тип файла не определен';
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('Error:', err);
          return;
        }
        result.push(`${name} - ${lastName} - ${stats.size} bt`);
        len += 1;
        if (len === files.length) {
          console.log(result.join('\n'));
        }
      });
    });
  }
});
