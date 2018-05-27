let express = require('express');
let app = express();
let request = require('request');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('search');
});

app.get('/results', (req, res) => {
  let query = req.query.search;
  let url = `http://omdbapi.com/?s=${query}&apikey=thewdb`;

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let data = JSON.parse(body);
      res.render('results', { data: data });
    }
  });
});

app.listen(3000, () => {
  console.log('Movie app has started');
});
