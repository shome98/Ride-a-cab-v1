import http from "http";
http.createServer((req, res) => {
    res.writeHead(200, { "content-type": "text/html; charset=UTF-8" })
    res.write("<h1>Hello there</h1>");
    res.write("<h2>changed again nodemon working check</h2>")
    res.end();
}).listen(4005, () => console.log(`app running at http://localhost:4005`));