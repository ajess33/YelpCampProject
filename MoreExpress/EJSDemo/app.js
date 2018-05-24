let express = require('express');
let app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/fallinlovewith/:thing', (req, res) => {
  let thing = req.params.thing;
  res.render('love', { thingVar: thing });
});

app.get('/posts', (req, res) => {
  let posts = [
    { title: 'Post 1', author: 'Susy' },
    { title: 'My day', author: 'Colt' },
    { title: 'My night', author: 'Austin' }
  ];

  res.render('posts', { posts: posts });
});

app.listen(3000, () => {
  console.log('Server Started');
});
