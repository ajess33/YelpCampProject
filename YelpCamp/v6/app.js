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

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// __dirname is just to be safe with path
app.use(express.static(__dirname + '/public'));
seedDB();

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

app.get('/', (req, res) => {
  res.render('landing');
});

// INDEX - show all campgrounds
app.get('/campgrounds', (req, res) => {
  // get all campgrounds from db
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
        campgrounds: allCampgrounds,
        currentUser: req.user
      });
    }
  });
});

// CREATE - add new campground to DB
app.post('/campgrounds', (req, res) => {
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  const newCampground = { name: name, image: image, description: desc };
  // Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      // redirect back to campgrounds page (when you have 2 of the same routes it automatically uses the GET route)
      res.redirect('/campgrounds');
    }
  });
});

// NEW - show form to create new campground
// shows the form that sends data to the post route above
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res) {
  //find the campground with provided ID
  Campground.findById(req.params.id)
    .populate('comments')
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        //render show template with that campground
        res.render('campgrounds/show', { campground: foundCampground });
      }
    });
});

// ==========================
// COMMENT ROUTES
// ==========================

app.get('/campgrounds/:id/comments/new', isLoggedIn, (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground });
    }
  });
});

app.post('/campgrounds/:id/comments', isLoggedIn, (req, res) => {
  // lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
  // create new comment
  // connect new comment to campground
  // redirect campground show page
});

// =====================
// AUTH ROUTES
// =====================

// show register form
app.get('/register', (req, res) => {
  res.render('register');
});
// handle sign up logic
app.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds');
    });
  });
});

// show login form
app.get('/login', (req, res) => {
  res.render('login');
});
// handling login logic
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }),
  (req, res) => {}
);

// logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

app.listen(3000, () => {
  console.log('YelpCamp server online');
});
