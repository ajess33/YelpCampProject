const express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  LocalStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local'),
  User = require('./models/user');

mongoose.connect('mongodb://localhost/auth_demo_app');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require('express-session')({
    secret: 'Morgan is the best girlfriend in the world',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
// decoding and encoding
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==================
// ROUTES
// ==================

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', (req, res) => {
  res.render('secret');
});

// AUTH ROUTES

// show sign up form
app.get('/register', (req, res) => {
  res.render('register');
});
// handling user sign up
app.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        return res.render('register');
      }
      passport.authenticate('local')(req, res, () => {
        res.redirect('/secret');
      });
    }
  );
});

// LOGIN ROUTES

// render login form
app.get('/login', (req, res) => {
  res.render('login');
});
// login logic
// middleware
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
  }),
  (req, res) => {}
);

app.listen(3000, () => {
  console.log('Server started');
});
