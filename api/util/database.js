const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.HOST || "localhost",
    dialect: process.env.DATABASE_TYPE || "postgres",
  }
);

module.exports = sequelize;
