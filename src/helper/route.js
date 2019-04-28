const fs = require('fs') // 用于判断模块是文还是文件夹
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir); // 让一些异步操作能够写成同步的形式

module.exports = async function(req,res,filePath){
    try {
        const stats = await stat(filePath) 
          if(stats.isFile()){
            res.statusCode = 200;
            res.setHeader('Content-Type','text/plain')
            fs.createReadStream(filePath).pipe(res)
          } else if(stats.isDirectory()) {
              const files = await readdir(filePath); // 这里一定要加上await的关键字
              res.statusCode = 200;
              res.setHeader('Content-Type','text/plain');
              res.end(files.join(','))  
          }
      } catch(ex) {
          console.log(ex)
          res.statusCode = 404;
          res.setHeader('Content-Type','text/plain');
          res.end("some bugs may happen on demo ")
      }
} 