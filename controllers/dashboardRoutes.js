const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

// GET displays dashboard page for users that are logged in
router.get('/', withAuth, async (req, res) => {
    try{
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'content',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    })
    
        // serialize data before passing to template
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      
}catch(err){
        console.log(err);
        res.status(500).json(err);
      };
  });

// Edit a post
router.get('/edit/:id', withAuth, async (req, res) => {
   try{
    const postData = Post.findOne({
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
          model: Comment,
          attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    })
        if (!postData) {
          res.status(404).json({ message: 'No post exists with this id' });
          return;
        }
        //format data before passing to render
        const post = postData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: true });
      }
      catch(err) {
        console.log(err);
        res.status(500).json(err);
      };
  });  

  module.exports = router;