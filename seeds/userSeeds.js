const { User } = require('../models');

const userData = [
  {
    name: "Ahmed",
    email: "Oneemailofaperson@maily.com",
    password: "asdf1234"
  },
  {
    name: "Barry",
    email: "NotthatBarry@maily.com",
    password: "asdf1234"
  },
  {
    name: "Dave",
    email: "LilDaveyWavey@maily.com",
    password: "asdf1234"
  },
  {
    name: "Lisa",
    email: "Callmelisa@maily.com",
    password: "asdf1234"
  },
  {
    name: "Jessica",
    email: "JessJessicaJefferson@maily.com",
    password: "asdf1234"
  }
];

const uSeeds = () => User.bulkCreate(userData);

//  WARNING seed bulk create does NOT hash the password, so they must be hashed via the update route before the login route will work!

module.exports = uSeeds;