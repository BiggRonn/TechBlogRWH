const uSeeds = require('./userSeeds');
const pSeeds = require('./postSeeds');
const cSeeds = require('./commentSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await uSeeds();
 await pSeeds();
  await cSeeds();
console.log("SEEDED THE DATABASE WITH RANDOM STUFF!!!!!!")
  process.exit(0);
};

seedAll();