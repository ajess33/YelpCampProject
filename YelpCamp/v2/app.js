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
  image: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//   {
//     name: 'Granite Hill',
//     image:
//       'https://images.unsplash.com/photo-1460458248189-2cb101df4e67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef0ed70802c5c63761e094167567d2fe&auto=format&fit=crop&w=500&q=60'
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

// shows us all campgrounds
app.get('/campgrounds', (req, res) => {
  // get all campgrounds from db
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds', { campgrounds: allCampgrounds });
    }
  });
});

app.post('/campgrounds', (req, res) => {
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = { name: name, image: image };
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

// shows the form that sends data to the post route above
app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.listen(3000, () => {
  console.log('YelpCamp server online');
});
