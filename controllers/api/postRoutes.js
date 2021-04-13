const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET api/posts/ -- get all posts and include id, content, title, and created_at attributes
router.get('/', async (req, res) => {

    try {
        const postData = await Post.findAll({

            attributes: [
                'id',
                'title',
                'content',
                'created_at',
            ],
            // post will be sorted from most recent to least recent
            order: [['created_at', 'DESC']],
            //include name attribute of user who posted
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        })
    
            res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// GET api/posts/:id -- target a post by id and display the id, content, title, and created_at attributes.. also include all comments for that post and username that created it
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
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
                    attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
                    include: [{
                        model: User,
                        attributes: ['name']
                    }]
                }
            ]
        })

        if (!postData) {
            res.status(404).json({ message: 'ID not found' });
            return;
        }
        res.json(postData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    // expects STRINGS title and content
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        })
        res.status(200).json(postData)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post exists with that id' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;