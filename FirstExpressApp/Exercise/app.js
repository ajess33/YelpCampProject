let express = require('express');
let app = express();

/*
  / should print 'Hi there, welcome to my assignment!'

  /speak/pig should print 'The pig says "Oink"'
  /speak/cow should print 'The cow says "Moo"'
  /speak/dog should print 'The dog says "Woof Woof"'

  /repeat/hello/3 should print "hello hello hello"
  /repeat/hello/5 should print "hello hello hello hello hello"
  /repeat/blah/2 should print "blah blah"
*/

app.get('/', (req, res) => {
  res.send('Hi there, welcome to my assignment');
});

app.get('/speak/:animal/', (req, res) => {
  const sounds = {
    pig: 'Oink',
    cow: 'Moo',
    dog: 'Woof Woof',
    cat: 'I hate you human',
    goldfish: '...'
  };
  let animal = req.params.animal.toLowerCase();
  let sound = sounds[animal];
  res.send(`The ${animal} says ${sound}`);
});

app.get('/repeat/:message/:times', (req, res) => {
  let message = req.params.message;
  let times = Number(req.params.times);
  let result = '';

  for (i = 0; i < times; i++) {
    result += massage + ' ';
  }
  res.send(result);
});

app.get('*', (req, res) => {
  res.send('Sorry, page not found...What are you doing with your life?');
});

app.listen(3000);
