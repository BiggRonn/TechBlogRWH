const router = require('express').Router();

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
  res.render('homepage', posts);
}catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
