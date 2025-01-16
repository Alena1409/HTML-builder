const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
// создала путь: из пути к файлу js и в той же папке нам нужен файл test.txt
//console.log(filePath);

const createRead = fs.createReadStream(filePath, 'utf-8');
//создала поток для чтения данных;

// читаю текст
createRead.on('data', function (text) {
  //console.log(text);
  process.stdout.write(text);
});
