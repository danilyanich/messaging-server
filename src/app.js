const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const routes = require('./routes');

const app = new Koa();

app.use(bodyparser());
app.use(logger());

routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
