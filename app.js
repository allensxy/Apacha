let fs = require('fs');
let http = require('http');
let path = require('path');
// mime 判断文档类型包
const mime = require('mime');

// 网站根路径
let rootPath = path.join(__dirname, 'www');
let server = http.createServer((req, res) => {
    // 告诉浏览器按照html解析文件
    // 拼接访问的路径
    let targetPath = path.join(rootPath, req.url);
    console.log(targetPath);
    // 判断路径存不存在
    if (fs.existsSync(targetPath)) { //存在
        fs.stat(targetPath, (err, stats) => {
            //console.log(stats.isDirectory()); // 判断是否是文件夹
            //console.log(stats.isFile()); // 判断是否是文件
            // 是文件，直接读取，并返回
            if (stats.isFile()) {
                // -------------------曾经战斗过的痕迹------------------- 
                // 获取文件的扩展名
                // let extName = path.extname(targetPath);
                // if (extName == '.html') {
                //     res.setHeader('Content-Type', 'text/html; charset=utf-8');
                // }
                // if (extName == '.css') {
                //     res.setHeader('Content-Type', 'text/css');
                // }
                // if (extName == '.png') {
                //     res.setHeader('Content-Type', 'text/png');
                // }
                // console.log(extName);

                // -------------------华丽的分割线-------------------
                // 站在巨人的肩膀上造轮子
                let aa = mime.getType(targetPath);
                console.log(aa);

                res.setHeader('Content-Type', mime.getType(targetPath));
                fs.readFile(targetPath, (err, data) => {
                    res.end(data);
                });
            }
            // 是文件夹 渲染出列表
            if (stats.isDirectory()) {
                fs.readdir(targetPath, (err, files) => {
                    let temp = '';
                    for (let i = 0; i < files.length; i++) {
                        temp += `
                            <li>
                                <a href="${req.url}${req.url=='/'?'':'/'}${files[i]}">${ files[i] }</a>
                            </li>
                        `;
                    }
                    res.end(
                        `
                        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
                        <html>
                            <head>
                                <title>Index of/ </title>
                            </head>
                            
                            <body>
                                <h1>Index of ${req.url}</h1>
                                <ul>
                                    ${temp}
                                </ul>
                            </body>
                        </html>
                    `);
                });
            }


        });
    } else { //不存在
        // 设置不存在的状态码
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
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
});



















































// let server = http.createServer((request, response) => {
//     // 拼接请求的完整路径
//     let targetPath = path.join(rootPath, request.url);
//     console.log(targetPath);
//     if (fs.existsSync(targetPath)) { //判断请求的路径存不存在
//         // 文件 还是文件夹
//         // let stats = fs.stat(targetPath);
//         response.end("这个文件存在");
//     } else {
//         // 只能设置头 不能设置 状态码
//         response.statusCode = 404;
//         response.setHeader('Content-Type', 'text/html; charset=utf-8');
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