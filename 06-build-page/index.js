const fs = require('fs').promises;
const path = require('path');

const projectPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const assetsPath = path.join(__dirname, 'assets');
const stylesPath = path.join(__dirname, 'styles');
const assetsProjectPath = path.join(projectPath, 'assets');
const indexProjectPath = path.join(projectPath, 'index.html');
const styleProjectPath = path.join(projectPath, 'style.css');

async function myFunction() {
  try {
    // созд-е project-dist
    await fs.mkdir(projectPath, { recursive: true });

    // созд-е assets
    await fs.rm(assetsProjectPath, { recursive: true, force: true });
    await fs.mkdir(assetsProjectPath, { recursive: true });

    // копир-ие папок из assets
    const folders = await fs.readdir(assetsPath);
    for (const folder of folders) {
      const oldFolder = path.join(assetsPath, folder);
      const newFolder = path.join(assetsProjectPath, folder);

      await fs.mkdir(newFolder, { recursive: true });

      const files = await fs.readdir(oldFolder);
      for (const file of files) {
        const oldFile = path.join(oldFolder, file);
        const newFile = path.join(newFolder, file);
        await fs.copyFile(oldFile, newFile);
      }
    }

    //созд-е файла styles
    let allStyles = [];
    const filesOfStyle = await fs.readdir(stylesPath, { withFileTypes: true });

    for (const fileStyle of filesOfStyle) {
      if (path.extname(fileStyle.name) === '.css' && fileStyle.isFile()) {
        const content = await fs.readFile(
          path.join(stylesPath, fileStyle.name),
          'utf-8',
        );
        allStyles.push(content);
      }
    }

    await fs.writeFile(styleProjectPath, allStyles.join('\n'));

    //созд-е index.html
    let templateContent = await fs.readFile(templatePath, 'utf-8');
    // созд-ие данных по тегам
    const tags = findTags(templateContent);

    // замена тега на комп-нт
    for (const tag of tags) {
      const componentContent = await readComponents(tag);
      const templateTag = `{{${tag}}}`;
      templateContent = templateContent.replace(templateTag, componentContent);
    }

    // запись в index.html
    await fs.writeFile(indexProjectPath, templateContent);
  } catch (err) {
    console.log('error:', err);
  }
}

// чтение файлов в Components по имени
async function readComponents(name) {
  const componentPath = path.join(__dirname, 'components', `${name}.html`);
  return fs.readFile(componentPath, 'utf-8');
}

// нахождение тегов
function findTags(templateContent) {
  const reg = /{{(\w+)}}/g;
  let tags = [];
  let match;
  while ((match = reg.exec(templateContent)) !== null) {
    tags.push(match[1]);
  }
  return [...new Set(tags)];
}

myFunction();
