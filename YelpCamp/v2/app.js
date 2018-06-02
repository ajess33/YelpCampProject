let express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//   {
//     name: 'Granite Hill',
//     image:
//       'https://images.unsplash.com/photo-1460458248189-2cb101df4e67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef0ed70802c5c63761e094167567d2fe&auto=format&fit=crop&w=500&q=60',
//     description:
//       'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
//   },
//   (err, campground) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('NEWLY CREATED CAMPGROUND: ');
//       console.log(campground);
//     }
//   }
// );

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
      res.render('index', { campgrounds: allCampgrounds });
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
  res.render('new');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
  // find the campground with provided ID
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render('show', { campground: foundCampground });
    }
  });
});

app.listen(3000, () => {
  console.log('YelpCamp server online');
});
