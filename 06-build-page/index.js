const fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const assetsPath = path.join(__dirname, 'assets');
const stylesPath = path.join(__dirname, 'styles');
const assetsProjectPath = path.join(projectPath, 'assets');
const indexProjectPath = path.join(projectPath, 'index.html');
const styleProjectPath = path.join(projectPath, 'style.css');
const componentsPath = path.join(__dirname, 'components');

fs.mkdir(projectPath, { recursive: true }, (err) => {
  if (err) {
    console.log('ошибка создания папки project-dist: ', err);
  }
  fs.rm(assetsProjectPath, { recursive: true, force: true }, (err) => {
    if (err) {
      console.log('error: ', err);
    }
    fs.mkdir(assetsProjectPath, { recursive: true }, (err) => {
      if (err) {
        console.log('error: ', err);
      }
    });
    fs.readdir(assetsPath, (err, foldersInAssets) => {
      if (err) {
        console.log('error: ', err);
      } else {
        foldersInAssets.forEach((file) => {
          const assetsFolderCopyPath = path.join(assetsProjectPath, file);
          fs.mkdir(assetsFolderCopyPath, { recursive: true }, (err) => {
            if (err) {
              console.log('error: ', err);
            }
          });
          const assetsFolderPath = path.join(assetsPath, file);
          fs.readdir(assetsFolderPath, (err, element) => {
            if (err) {
              console.log('error: ', err);
            } else {
              element.forEach((a) => {
                const oldFile = path.join(assetsFolderPath, a);
                const newFile = path.join(assetsFolderCopyPath, a);
                fs.copyFile(oldFile, newFile, (err) => {
                  if (err) {
                    console.log('ошибка копирования: ', err);
                  }
                });
              });
            }
          });
        });
      }
    });
  });

  let allStyles = [];

  fs.readdir(stylesPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log('ошибка чтения файла styles: ', err);
    } else {
      files.forEach((item) => {
        if (path.extname(item.name) === '.css') {
          const itemPath = path.join(stylesPath, item.name);
          fs.readFile(itemPath, 'utf-8', (err, data) => {
            if (err) {
              console.log('error: ', err);
            } else {
              allStyles.push(data);

              fs.writeFile(styleProjectPath, allStyles.join(''), (err) => {
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

  let text = [];
  let articlesFile = [];
  let footerFile = [];
  let headerFile = [];

  fs.readdir(componentsPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log('ошибка чтения components: ', err);
    } else {
      files.forEach((item) => {
        if (path.extname(item.name) === '.html') {
          const itemPath = path.join(componentsPath, item.name);
          if (item.name === 'articles.html') {
            fs.readFile(itemPath, 'utf-8', (err, data) => {
              if (err) {
                console.log('error: ', err);
              } else {
                articlesFile.push(data);
              }
            });
          }
          if (item.name === 'footer.html') {
            fs.readFile(itemPath, 'utf-8', (err, data) => {
              if (err) {
                console.log('error: ', err);
              } else {
                footerFile.push(data);
              }
            });
          }
          if (item.name === 'header.html') {
            fs.readFile(itemPath, 'utf-8', (err, data) => {
              if (err) {
                console.log('error: ', err);
              } else {
                headerFile.push(data);
              }
            });
          }
        }
      });
      fs.readFile(templatePath, 'utf-8', (err, data) => {
        if (err) {
          console.log('error: ', err);
        } else {
          let result = data;
          result = result.replace('{{header}}', headerFile.join(''));
          result = result.replace('{{articles}}', articlesFile.join(''));
          result = result.replace('{{footer}}', footerFile.join(''));

          text.push(result);

          fs.writeFile(indexProjectPath, text.join(''), (err) => {
            if (err) {
              console.log('ошибка записи в индекс: ', err);
            }
          });
        }
      });
    }
  });
});
