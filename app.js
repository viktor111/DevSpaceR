const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');

const serverConfig = require("./bin/servercfg")

const ProjectController = require("./Controllers/ProjectController")

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth')
const projectRouter = require('./routes/project')
const managerRouter = require('./routes/manager')
const userRouter = require('./routes/user')
const chatRouter = require('./routes/chat')

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

app.use('/Chat', chatRouter)
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

const port = serverConfig.normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
//server.on('error', serverConfig.onError);
//server.on('listening', serverConfig.onListening(server));