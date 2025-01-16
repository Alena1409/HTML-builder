const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
});

const rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(
  `Hello!
I created file, let's save your text, write please...\n`,
);
rl.prompt();

rl.on('line', (text) => {
  if (text === 'exit') {
    rl.close(console.log('GoodBye'));
  } else {
    fs.appendFile(
      filePath,

      `${text}\n`,
      (err) => {
        if (err) throw err;
      },
    );
  }
});

rl.on('SIGINT', () => {
  rl.close(console.log('GoodBye'));
});
