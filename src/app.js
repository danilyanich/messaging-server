const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const app = new Koa();

app.use(bodyparser());
app.use(logger());

routes(app);

app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000');
});
