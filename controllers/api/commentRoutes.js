const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Routes

// Get comments
router.get('/', async (req, res) => {
    const commentData = Comment.findAll()
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Post a new comment
router.post('/', withAuth, async (req, res) => {

    try {
        if (req.session) {
            const commentData = await Comment.create({
                comment_text: req.body.content,
                post_id: req.body.post_id,
                user_id: req.session.user_id
            })
            res.json(commentData)
        }
    } catch (err) {
        console.log(err);
        res.status(400).json(err);

    }
})
    ;

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })

        if (!commentData) {
            res.status(404).json({ message: 'No comment with that ID was found' });
            return;
        }
        res.json(commentData);
    }
        catch (err) {
    console.log(err);
    res.status(500).json(err);
}});
;

module.exports = router;