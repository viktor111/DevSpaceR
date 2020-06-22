const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');
const debug = require('debug')('devspacer:server');

const ProjectController = require("./Controllers/ProjectController")

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth')
const projectRouter = require('./routes/project')
const managerRouter = require('./routes/manager')
const userRouter = require('./routes/user')

const app = express();

const Firebase = require("./Config/firebaseAuth");
let serviceAccount = require("./Config/devspacer-85c37-firebase-adminsdk-v8iq9-579733c529.json")

let FirebaseContext = new Firebase(serviceAccount);
FirebaseContext.connect()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/User', userRouter)
app.use('/Manager' , managerRouter)
app.use('/Project', projectRouter)
app.use('/Auth', authRouter)
app.use(indexRouter);


app.use(function(req, res, next) { 

  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    
    return val;
  }

  if (port >= 0) {

    return port;
  }

  return false;
}


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);


server.on('error', () => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {

  const addr = server.address();

  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
});


