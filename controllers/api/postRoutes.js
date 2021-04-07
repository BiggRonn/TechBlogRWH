const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET api/posts/ -- get all posts and include id, content, title, and created_at attributes
router.get('/', async (req, res) => {
    try{
   const postData = await Post.findAll({
      
        attributes: [
            'id',
            'content',
            'title',
            'created_at',
          ],
        // Order the posts from most recent to least
        order: [[ 'created_at', 'DESC']],
        //include user name of post creator and all comments for the post
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .res.json(postData)
}catch(err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// GET api/posts/:id -- get a single post by id with id, content, title, and created_at attributes.. also include all comments for that post and username that created it
router.get('/:id', async (req, res) => {
    try{
    const postData = Post.findOne({
      where: {
        id: req.params.id
      },
     
      attributes: [
        'id',
        'content',
        'title',
        'created_at',
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
      ]
    })
     
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(postData);
      
    }catch(err){
        console.log(err);
        res.status(500).json(err);
      }
  });