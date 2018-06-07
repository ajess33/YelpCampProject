const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo');

// POST - title, content
const postSchema = new mongoose.Schema({
  title: String,
  content: String
});
// tuen Schema into a model
const Post = mongoose.model('Post', postSchema);

let newPost = new Post({
  title: 'Reflections on Apples',
  content: 'They are delicious'
});

// USER = email, name
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});
// turn Schema into a model
const User = mongoose.model('User', userSchema);

// let newUser = new User({
//   email: 'austin@brown.edu',
//   name: 'Austin Brown'
// });

// newUser.save((err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// newPost.save((err, post) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

User.findOne({ name: 'Austin Brown' }, (err, user) => {
  if (err) {
    console.log(err);
  } else {
    user.posts.push({
      title: '3 Things I really hate',
      content: 'Voldemort. Voldemort. Voldemort'
    });
    user.save((err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
      }
    });
  }
});
