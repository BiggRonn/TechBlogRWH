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
                'content',
                'title',
                'created_at',
            ],
            // post will be sorted from most recent to least recent
            order: [['created_at', 'DESC']],
            //include post username
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
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// GET api/posts/:id -- target a post by id and display the id, content, title, and created_at attributes.. also include all comments for that post and username that created it
router.get('/:id', async (req, res) => {
    try {
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
                    model: 'comment',
                    attributes: ['username']
                },
                {
                    model: 'comment',
                    attributes: ['id', 'content', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: 'user',
                        attributes: ['username']
                    }
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
    // expects {title: 'String of Stuff', content: 'String of stuff, all the text content.', user_id: 1}
    try {
        const postData = Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        res.json(postData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;