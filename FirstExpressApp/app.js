let express = require('express');
let app = express();

// "/" => "Hi there!"
app.get('/', (req, res) => {
  res.send('Hi there!');
});

// "/bye" => "Goodbye!"
app.get('/bye', (req, res) => {
  res.send('Goodbye!');
});

// "/dog" => "MEOW!"
app.get('/dog', (req, res) => {
  res.send('MEOW!');
});

app.get('/r/:subredditName', (req, res) => {
  const subreddit = req.params.subredditName.toUpperCase();
  res.send(`Welcome to the ${subreddit} subreddit!`);
});

app.get('/r/:subredditName/comments/:id/:title/', (req, res) => {
  res.send('Comments');
});

// catch all
app.get('*', (req, res) => {
  res.send('Your are a star!');
});

// Tell Express to listen for requests (start server)
app.listen(3000, () => {
  console.log('Server has started');
});
