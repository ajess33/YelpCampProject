const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2');

const Post = require('./models/post');
const User = require('./models/user');

// User.create({
//   email: 'bob@gmail.com',
//   name: 'Bob Belcher'
// });

Post.create(
  {
    title: 'How to cook the best burger pt. 3',
    content: 'hgrueghruigh28'
  },
  (err, post) => {
    User.findOne({ email: 'bob@gmail.com' }, (err, foundUser) => {
      if (err) {
        console.log(err);
      } else {
        foundUser.posts.push(post);
        foundUser.save((err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
          }
        });
      }
    });
  }
);

// find user
// find all posts for that user

// exec makes everything happen
// User.findOne({ email: 'bob@gmail.com' })
//   .populate('posts')
//   .exec((err, user) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(user);
//     }
//   });
