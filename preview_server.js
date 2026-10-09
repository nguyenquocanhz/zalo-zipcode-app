const http = require('http');
const fs = require('fs');
const path = require('path');

const www = path.join(__dirname, 'www');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let safePath = req.url.split('?')[0];
  if (safePath === '/') safePath = '/index.html';
  let file = path.join(www, safePath);
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(www, 'index.html');
  }
  const ext = path.extname(file);
  res.writeHead(200, { 
    'Content-Type': mime[ext] || 'application/octet-stream',
    'Access-Control-Allow-Origin': '*'
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(4173, () => {
  console.log('Preview server running at http://localhost:4173');
});
