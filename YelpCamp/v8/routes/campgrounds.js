const express = require('express'),
  router = express.Router(),
  Campground = require('../models/campground');

// INDEX - show all campgrounds
router.get('/', (req, res) => {
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
router.post('/', isLoggedIn, (req, res) => {
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  const newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  };
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
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// SHOW - shows more info about one campground
router.get('/:id', function(req, res) {
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

// EDIT campground route
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render('campgrounds/edit', { campground: foundCampground });
  });
});

// UPDATE campground route
router.put('/:id', (req, res) => {
  // find and update the correct campground
  Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground,
    (err, updatedCampground) => {
      if (err) {
        res.redirect('/campgrounds');
      } else {
        res.redirect('/campgrounds/' + req.params.id);
      }
    }
  );
});

// DESTROY campground route
router.delete('/:id', (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});

// Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkCampgroundOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        res.redirect('/campgrounds');
      } else {
        // does the user own the campground?
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          res.send('YOU DO NOT HAVE PERMISSION TO DO THAT');
        }
      }
    });
  } else {
    res.redirect('back');
  }
  // does user own the campground?
  // otherwise, redirect
  // if not, redirect
}

module.exports = router;
