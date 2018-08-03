const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const config = require('./serverConfig');

const firebase = require('firebase');
require("firebase/firestore");
firebase.initializeApp(config.firebase);


const routes = require('./routes');

const app = new Koa();

app.use(cors());
app.use(bodyparser());
app.use(logger());

routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
});
