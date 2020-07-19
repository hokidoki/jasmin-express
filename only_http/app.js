const http = require('http')
const middleware = require('./middlewares')();

const Application = () => {
   
  const _server = http.createServer((req, res) => {
    middleware.run(req, res);
  });
  const use = fn => middleware.add(fn);
  const listen = (port = 3000, hostname = '127.0.0.1', fn) => {
    _server.listen(port, hostname, fn)
  }
  return {
    _server,
    listen,
    use
  }
}

module.exports = Application