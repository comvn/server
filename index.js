const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Fake delay
server.use((req, res, next) => {
  console.log("setTimeout 100ms");
  setTimeout(next, 100);
});

server.use(router);

server.listen(process.env.PORT || 3000, () => {
  console.log("JSON Server is running");
});