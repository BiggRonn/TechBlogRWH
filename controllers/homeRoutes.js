const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  
  try{
    const posts = router.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'created-at'

    ],
    include: [{
      model: User,
      attributes: 'name'
    },
  {
    model: Comment,
    attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
    include: {
      model: User,
      attributes: 'name'
    }

  }]
  })
  posts = posts.map(post => post.get({plain: true}));
  res.render('homepage', {posts, loggedIn: req.session.loggedIn});
}catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
