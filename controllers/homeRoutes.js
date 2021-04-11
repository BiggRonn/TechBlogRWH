const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');



router.get('/', (req, res) => {
  Post.findAll({
      attributes: [
          'id',
          'content',
          'title',
          'created_at',
        ],
      // Order the posts from most recent to least
      order: [[ 'created_at', 'DESC']],

      include: [
          {
              model: User,
              attributes: ['name']
          },
          {
              model: Comment,
              attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
              include: {
                  model: User,
                  attributes: ['name']
              }
          }
      ]
  })

  .then(postData => {
    const posts = postData.map(post => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'content',
      'created_at',
    ],
    include: [
      {
        model: User,
        attributes: ['name']
      },
      {
          model: Comment,
          attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
          include: {
              model: User,
              attributes: ['name']
          }
      }
    ]
  })
    .then(postData => {

      if (!postData) {
        res.status(404).json({ message: 'No post by this id exists' });
        return;
      }
      const post = postData.get({ plain: true });
      res.render('view-post', {
          post,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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
