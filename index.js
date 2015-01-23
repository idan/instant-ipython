var http = require('http');
var httpProxy = require('http-proxy');


var proxy = new httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 59682
  }
});

var wsProxy = httpProxy.createServer({
  target: 'ws://localhost:59683',
  ws: true
});

var proxyServer = http.createServer(function (req, res) {
  proxy.web(req, res);
});

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
});

//
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
proxyServer.on('upgrade', function (req, socket, head) {
  wsProxy.ws(req, socket, head);
});

wsProxy.on('close', function (req, socket, head) {
  console.log('Client disconnected');
});

wsProxy.on('error', function (req, socket, head) {
  console.log('Client error');
});

proxyServer.listen(process.env.PORT || 5000);
