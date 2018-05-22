let express = require('express');
let app = express();

// "/" => "Hi there!"
// "/bye" => "Goodbye!"
// "/dog" => "MEOW!"

app.get('/', (req, res) => {
  res.send('Hi there!');
});

app.get('/bye', (req, res) => {
  res.send('Goodbye!');
});

app.get('/dog', (req, res) => {
  res.send('MEOW!');
});

// Tell Express to listen for requests (start server)
app.listen(3000, () => {
  console.log('Server has started');
});
