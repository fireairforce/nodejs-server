const fs = require('fs') // 用于判断模块是文还是文件夹
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir); // 让一些异步操作能够写成同步的形式
const HandleBars = require('handlebars');
const path = require('path');
const config = require('../config/defaultConfig')
const chalk = require('chalk')


const tplPath = path.join(__dirname,'../template/dir.tpl.html')
const source = fs.readFileSync(tplPath); 
// fs会读出来一个buffer文件流，这里在传入模板引擎去进行编译的时候修改为字符串类型
const template = HandleBars.compile(source.toString()) 

const mime = require('../helper/mime')

const compress = require('./compress')

module.exports = async function(req,res,filePath){
    try {
        const stats = await stat(filePath) 
          if(stats.isFile()){
            const contentType = mime(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type',contentType)
            let rs = fs.createReadStream(filePath);
            if(filePath.match(config.compress)){
                rs =compress(rs,req,res);
            }
            // fs.createReadStream(filePath).pipe(res)
            rs.pipe(res)
          } else if(stats.isDirectory()) {
              const files = await readdir(filePath); // 这里一定要加上await的关键字
              res.statusCode = 200;
              res.setHeader('Content-Type','text/html');
              const dir = path.relative(config.root,filePath)
              console.log(chalk.green(dir))
              const data = {
                  titles:path.basename(filePath),
                  dir: dir? `/${dir}` : '',
                  files:files.map(file=>{
                      return {
                          file,
                          icon: mime(file)
                      }
                  })
              };
              res.end(template(data))  
          }
      } catch(ex) {
          console.log(ex)
          res.statusCode = 404;
          res.setHeader('Content-Type','text/plain');
          res.end("some bugs may happen on demo ")
      }
} 