const fs = require('fs');
const path = require('path');

const filesPath = path.join(__dirname, 'files');
const filesCopyPath = path.join(__dirname, 'files-copy');

fs.mkdir(filesCopyPath, { recursive: true }, (err) => {
  if (err) {
    console.log('ошибкасоздания папки');
  }

  fs.readdir(filesCopyPath, (err, copyFiles) => {
    if (err) {
      console.error('ошибка:', err);
      return;
    } else {
      copyFiles.forEach((file) => {
        const filePath = path.join(filesCopyPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Ошибка удаления файла ${file}:`, err);
          }
        });
      });
    }

    fs.readdir(filesPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(err);
        return;
      } else {
        files.forEach((item) => {
          const oldFile = path.join(filesPath, item.name);
          const newFile = path.join(filesCopyPath, item.name);
          fs.copyFile(oldFile, newFile, (err) => {
            if (err) {
              console.log('ошибка копирования');
            }
          });
        });
      }
    });
  });
});
