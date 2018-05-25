let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const friends = ['Tony', 'Miranda', 'Justin', 'Pierre', 'Lily'];

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/addfriend', (req, res) => {
  // newfriend comes from the input's name prop
  let newFriend = req.body.newfriend;
  friends.push(newFriend);
  res.redirect('/friends');
});

app.get('/friends', (req, res) => {
  // the first 'friends' can be anything
  res.render('friends', { friends: friends });
});

app.listen(3000, () => {
  console.log('Server Started');
});
