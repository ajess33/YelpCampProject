let express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  app = express();

// APP CONFIG
mongoose.connect('mongodb://localhost/restful_blog_app');
app.set('view engine', 'ejs');
// to serve custom style sheet
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// RESTFUL ROUTES

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log('Error!');
    } else {
      res.render('index', { blogs: blogs });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is live');
});
