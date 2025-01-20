const fs = require('fs').promises;
const path = require('path');

const filesPath = path.join(__dirname, 'files');
const filesCopyPath = path.join(__dirname, 'files-copy');

async function myFunction() {
  try {
    //удалени-создание папки files-copy
    await fs.rm(filesCopyPath, { recursive: true, force: true });
    await fs.mkdir(filesCopyPath, { recursive: true });

    //чтение папки для копирования и копирование файлов
    const files = await fs.readdir(filesPath);
    for (const file of files) {
      const oldFile = path.join(filesPath, file);
      const newFile = path.join(filesCopyPath, file);
      await fs.copyFile(oldFile, newFile);
    }
  } catch (err) {
    console.log('error: ', err);
  }
}

myFunction();
