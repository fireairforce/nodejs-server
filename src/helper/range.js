module.exports = (totalSize,req,res) =>{
    const range = req.headers['range'] // 在请求头中拿到range
    if(!range) {
        // 处理不了的情况就直接返回回去
        return {code:200};
    }
    const sizes = range.match(/bytes=(\d*)-(\d*)/);
    console.log(size);
    const end = sizes[2] || totalSize - 1;
    const start = sizes[1] || totalSize - 1;
    if(start > end || start<0 || end > totalSize){
        return { code :200 }
    }
    res.setHeader('Accept-Ranges','bytes');
    res.setHeader('Content-Range',`bytes ${start}-${end}/${totalSize}`);
    res.setHeader('Content-Length',end-start);
    return {
        code :206,
        start:parseInt(start),
        end:parseInt(end)
    }
}