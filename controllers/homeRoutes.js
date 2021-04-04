const router = require('express').Router();

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
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
  res.render('homepage', posts);
});

module.exports = router;
