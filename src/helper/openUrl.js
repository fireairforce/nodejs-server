const { exec } = require('child_process');

module.exports = (url) =>{
   switch (process.platform) {
       case 'darwim':
           exec(`open ${url}`)
           break;
       case 'win32':
           exec(`start ${url}`) 
       default:
           break;
   }
}