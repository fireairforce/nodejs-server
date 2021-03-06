const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk');
const path = require('path');
const route = require('./helper/route')
const openUrl = require('./helper/openUrl')
class Server {
  constructor(config){
    this.conf = Object.assign({},conf,config) // 对配置文件进行merge
  }
  start() {
    const server = http.createServer((req,res)=>{
      const filePath = path.join(this.conf.root,req.url);
      route(req,res,filePath,this.conf)  
    });

    server.listen(this.conf.port,this.conf.hostname,()=>{
        const addr = `http://${this.conf.hostname}:${this.conf.port}`;
        console.info(`Server stared at ${chalk.green(addr)}`);
        openUrl(addr) // 让他帮我们自动打开
    });
  }
}

module.exports = Server;
