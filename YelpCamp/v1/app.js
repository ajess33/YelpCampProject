let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let campgrounds = [
  {
    name: 'Salmon Creek',
    image:
      'https://images.unsplash.com/photo-1485343034225-9e5b5cb88c6b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a28fc68742556a682ecac876ab4b9c2c&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Granite Hill',
    image:
      'https://images.unsplash.com/photo-1460458248189-2cb101df4e67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef0ed70802c5c63761e094167567d2fe&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: "Mountain Goat's Rest",
    image: 'https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg'
  }
];

app.get('/', (req, res) => {
  res.render('landing');
});

// shows us all campgrounds
app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campgrounds: campgrounds });
});

app.post('/campgrounds', (req, res) => {
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = { name: name, image: image };
  campgrounds.push(newCampground);
  // redirect back to campgrounds page (when you have 2 of the same routes it automatically uses the GET route)
  res.redirect('/campgrounds');
});

// shows the form that sends data to the post route above
app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.listen(3000, () => {
  console.log('YelpCamp server online');
});
