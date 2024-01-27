require("dotenv").config({ path: ".env" });
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);
