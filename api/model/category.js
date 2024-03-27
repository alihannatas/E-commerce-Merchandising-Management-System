const Sequelize = require("sequelize");

const db = require("../util/database");

const Category = db.define("Category", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

module.exports = Category;
