const Sequelize = require("sequelize");

const db = require("../util/database");
const Category = require("./category");

const Products = db.define("Product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(200),
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  stockQuantity: {
    type: Sequelize.INTEGER,
  },
  categoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: "id",
    },
  },
});

module.exports = Products;
