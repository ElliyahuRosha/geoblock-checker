const http = require('http');
const https = require('https');

const server = http.createServer((req, res) => {
  https.get('https://polymarket.com/api/geoblock', (apiRes) => {
    let data = '';
    apiRes.on('data', chunk => data += chunk);
    apiRes.on('end', () => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(data);
    });
  }).on('error', (err) => {
    res.writeHead(500);
    res.end('Error: ' + err.message);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log('Server running on port ' + port));
