const http = require('http')
const middleware = require('./middlewares')();

const Application = () => {
   
  const _server = http.createServer((req, res) => {
    middleware.run(req, res);
  });

  const use = (path, fn) => {
    if (typeof path === 'string' && typeof fn === 'function') {
      fn._path = path;
      //만약 path가 존재하면 fn의 프로퍼티로 path를 추가
    } else if (typeof path == 'function') {
        //첫번째 전달인자가 fn이라면 fn파라메터를 path 전달인자로 들어온 함수로 할당
      fn = path;
    } else {
      throw Error('Usage: use(path, fn) or use(fn)');
    }
    middleware.add(fn);
  }

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