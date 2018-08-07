let fs = require('fs');
let http = require('http');
let path = require('path');

// 网站根路径
let rootPath = path.join(__dirname + '/www');
let server = http.createServer((req, res) => {
    // 告诉浏览器按照html解析
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // 拼接访问的路径
    let targetPath = path.join(rootPath, req.url);
    console.log(targetPath);
    // 判断路径存不存在
    if (fs.existsSync(targetPath)) { //存在
        fs.stat(targetPath, (err, stats) => {
            // 判断是否是文件夹
            console.log(stats.isDirectory());
            // 判断是否是文件
            console.log(stats.isFile());
            fs.readFile(targetPath, (err, data) => {
                res.end(data);
            });
        });
    } else { //不存在
        // 设置不存在的状态码
        res.statusCode = 404;
        res.end(
            `
            <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
            <html><head>
            <title>404 Not Found</title>
            </head><body>
            <h1>Not Found</h1>
            <p>你请求的${req.url} 不在服务器上哦,检查一下呗</p>
            </body></html>
        `);
    }
})



















































// let server = http.createServer((request, response) => {
//     // 拼接请求的完整路径
//     let targetPath = path.join(rootPath, request.url);
//     console.log(targetPath);
//     response.setHeader('Content-Type', 'text/html; charset=utf-8');
//     if (fs.existsSync(targetPath)) { //判断请求的路径存不存在
//         // 文件 还是文件夹
//         // let stats = fs.stat(targetPath);
//         response.end("这个文件存在");
//     } else {
//         // 只能设置头 不能设置 状态码
//         response.statusCode = 404;
//         response.end(
//             `
//             <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
//             <html><head>
//             <title>404 Not Found</title>
//             </head><body>
//             <h1>Not Found</h1>
//             <p>你请求的${request.url} 不在服务器上哦,检查一下呗</p>
//             </body></html>
//         `);
//     }

// });

server.listen(3000, '127.0.0.1', () => {
    console.log("开启服务器！！！");
})