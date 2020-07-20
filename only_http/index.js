const app = require('./app')();
const hostname = '127.0.0.1';
const port = 3000;

app.use((req, res,next) => {
  console.log("미들웨어 1");
  next();
})

app.use('/test',(req, res) => {
  console.log("testrouet");
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('test router')
})

app.use('/test/router',(req, res) => {
  console.log("두번째 router");
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('test/router success.')
})

app.use((req, res) => {
  console.log("누군가 접속하였습니다.");
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World\n')
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});