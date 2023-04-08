require('dotenv').config();

const express = require('express');
const path = require("path");
const app = express();
const { exempleMiddleware } = require('./src/middlewares/exempleMiddleware');
const { checkCsrfError, csrfMiddleware } = require('./src/middlewares/csrfMiddleware');

const mongoose = require('mongoose').default;
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    app.emit('connected');
  })
  .catch((e) => {console.log(e)});

const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require("connect-mongo");

const helmet = require('helmet');
// app.use(helmet());
//desativar para o localhost (em desenvolvimento)

const csrf = require('csurf');

const sessionOptions = session({
  // secret: require('crypto').randomBytes(48).toString('hex'),
  secret: 'setatsdat sadsa sa agagas asfsafsaf54656564',
  store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*60*24*7, //7 dias em ms
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flash());

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(exempleMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use('/', require('./src/routes/home'));

app.listen(3000, () => {
  console.log('🚀 listening port 3000');
  console.log('http://localhost:3000/');
});
