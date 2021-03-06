
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
//authorization middleware helper
const withAuth = require('../../utils/auth');

// allows us to stay logged in
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// GET /api/users -- get all users from DB and exclude password attribute
router.get('/', async (req, res) => {

  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] }
    })
    console.log(userData);
    res.json(userData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

// GET /api/users/1 -- get a single user by id excluding the password attribute
router.get('/:id', async (req, res) => {
 try{
  const userData =  await User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    // include all post and comments by user
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'content', 'created_at']
      },
      {
        model: Comment,
        attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
  
      if (!userData) {
        // error if no user
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }

      res.json(userData);
    
    }catch(err) {
      // return any errors
      console.log(err);
      res.status(500).json(err);
    };
});

//user signup route
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


//user login route
router.post('/login', async (req, res) => {
  try {
    const uData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!uData) {
      res
        .status(400)
        .json({ message: 'Incorrect login information' });
      return;
    }
    //verify user using checkPassword method in User model
    const validPassword = await uData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect login information' });
      return;
    }
    // After user email and password is checked, we add a loggedIn and user attributes to our session
    req.session.save(() => {
      req.session.user_id = uData.id;
      req.session.username = uData.name;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: uData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', withAuth, (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;