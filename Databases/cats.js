let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app');

// pattern
const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

// now has methods on the pattern above
const Cat = mongoose.model('Cat', catSchema);

// adding a new cat to the DB

// const george = new Cat({
//   name: 'Mrs. Norris',
//   age: 7,
//   temperament: 'Evil'
// });

// george.save((err, cat) => {
//   if (err) {
//     console.log('SOMETHING WENT WRONG');
//   } else {
//     console.log('We just saved a cat to the DB: ');
//     console.log(cat);
//   }
// });

Cat.create(
  {
    name: 'Snow White',
    age: 15,
    temperament: 'Bland'
  },
  (err, cat) => {
    if (err) {
      console.log(err);
    } else {
      console.log(cat);
    }
  }
);

// retrieve all cats from the DB and console.log each one

Cat.find({}, (err, cats) => {
  if (err) {
    console.log('Oh no, ERROR');
    console.log(err);
  } else {
    console.log(cats);
  }
});
