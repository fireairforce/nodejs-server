const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk');
const path = require('path');
const server = http.createServer((req,res)=>{
  
  res.statusCode = 200;
  res.setHeader('Content-type','text/html');
  res.end(filePath);
});

server.listen(conf.port,conf.hostname,()=>{
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.info(`Server stared at ${chalk.green(addr)}`);
});