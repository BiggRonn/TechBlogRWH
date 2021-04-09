const { Post } = require('../models');

const postData = [
  {
    title: 'Title of Random Post',
    content: 'We keeping it real big up in the hizzy, in yeh know what I mean?',
    user_id: 1,
  },
  {
    title: 'Computer Science is fun!',
    content: 'I love coding, and coding loves me. This entire post is about that, I have a lot to say about that. Thanks for reading',
    user_id: 2,
  },
  {
    title: 'Title of Post 3',
    content: 'Lorem Ipsum placeholder text stuff in this spot where the content of the post goes',
    user_id: 2,
  },
  {
    title: 'Javascript and Stuff',
    content: 'This website uses Javascript to do stuff',
    user_id: 3,
  },
  {
    title: 'HTML is BACK!!',
    content: 'Html is back in the projects in a big way with handlebars and stuff like it!',
    user_id: 4,
  },
  {
    title: 'Technology Title',
    content: 'This is the contents of a post about technology',
    user_id: 5,
  },
]

const pSeeds = () => Post.bulkCreate(postData);

module.exports = pSeeds;