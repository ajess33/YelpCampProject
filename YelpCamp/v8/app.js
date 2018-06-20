const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  Campground = require('./models/campground'),
  Comment = require('./models/comment'),
  User = require('./models/user'),
  seedDB = require('./seeds');

// Requiring Routes
const commentRoutes = require('./routes/comment'),
  campgroundRoutes = require('./routes/campgrounds'),
  indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// __dirname is just to be safe with path
app.use(express.static(__dirname + '/public'));
// seedDB();  // seed the database

// middleware function
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  // move on to next callback
  next();
});

// PASSPORT CONFIGURATION
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
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000, () => {
  console.log('YelpCamp server online');
});
