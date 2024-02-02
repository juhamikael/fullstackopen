// util/db.js
const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error('Error while connecting to the database:', err);
    process.exit(1);
  }

  return sequelize;
};

module.exports = { connectToDatabase, sequelize }