let express = require('express');
let app = express();
let request = require('request');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/results', (req, res) => {
  request(
    'http://omdbapi.com/?s=iowa&apikey=thewdb',
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let data = JSON.parse(body);
        res.render('results', { data: data });
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Movie app has started');
});
