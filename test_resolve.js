const path = require('path');
const fs = require('fs');

console.log('Process CWD:', process.cwd());
console.log('__dirname:', __dirname);
const target = path.resolve(__dirname, 'admin.html');
console.log('Target absolute path:', target);
console.log('File exists at target:', fs.existsSync(target));
console.log('Directory contents of __dirname:', fs.readdirSync(__dirname));
