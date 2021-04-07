const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET api/posts/ -- get all posts
router.get('/', async (req, res) => {
    try{
   const postData = await Post.findAll({
        // Query configuration
        // From the Post table, include the post ID, URL, title, and the timestamp from post creation
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