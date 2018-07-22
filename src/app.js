const Koa = require('koa');
const bodyparser = require('koa-bodyparser');

const routes = require('./routes');

const app = new Koa();

app.use(bodyparser());

routes(app);

app.listen(3000, () => {
  console.log('App is listening on http://localhost:3000');
});
