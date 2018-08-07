let fs = require('fs');
let http = require('http');
let path = require('path');

// 网站根路径
let rootPath = path.join(__dirname + '/www');
let server = http.createServer((request, response) => {
    // 拼接请求的完整路径
    let targetPath = path.join(rootPath, request.url);
    console.log(targetPath);
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (fs.existsSync(targetPath)) { //判断请求的路径存不存在
        // 文件 还是文件夹
        // let stats = fs.stat(targetPath);
        response.end("这个文件存在");
    } else {
        // 只能设置头 不能设置 状态码
        response.statusCode = 404;
        response.end(
            `
            <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
            <html><head>
            <title>404 Not Found</title>
            </head><body>
            <h1>Not Found</h1>
            <p>你请求的${request.url} 不在服务器上哦,检查一下呗</p>
            </body></html>
        `);
    }

});

server.listen(3000, '127.0.0.1', () => {
    console.log("开启服务器！！！");
})