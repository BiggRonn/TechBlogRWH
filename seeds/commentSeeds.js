const { Comment } = require('../models');

const commentData = [
  {
    content: "This is a random mean comment!",
    user_id: 1,
    post_id: 4
  },
  {
    content: "Wow, incredible.",
    user_id: 4,
    post_id: 3
  },
  {
    content: "That is awesome!",
    user_id: 2,
    post_id: 2
  },
  {
    content: "Great stuff!",
    user_id: 3,
    post_id: 1
  },
  {
    content: "Random Text here to go in the seed file, comment stuff",
    user_id: 4,
    post_id: 3
  },
  {
    content: "This is a random comment by user 3! What are they saying?!",
    user_id: 3,
    post_id: 5
  },
];

const cSeeds = () => Comment.bulkCreate(commentData);

module.exports = cSeeds;