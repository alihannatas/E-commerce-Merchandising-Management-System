const Product = require("../model/products");
const Category = require("../model/category");
const { where } = require("sequelize");

exports.addProduct = async (req, res, next) => {
  const { title, description, stockQuantity, categoryId } = req.body;
  const product = await Product.create({
    title,
    description,
    stockQuantity,
    categoryId,
  })
    .then((product) => {
      console.log(product);
      res.json(product);
    })
    .catch((err) => console.log(err));
};

exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByPk(id)
    .then((product) => {
      console.log(product);
      res.json(product);
    })
    .catch((err) => console.log(err));
};

exports.updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, stockQuantity, categoryId } = req.body;
  const product = await Product.findByPk(id)
    .then((product) => {
      product.title = title;
      product.description = description;
      product.stockQuantity = stockQuantity;
      product.categoryId = categoryId;
      return product.save();
    })
    .then((result) => {
      console.log(result);
      res.json({ message: "Product succesfully updated." });
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log(result);
      res.json({ message: "Product succesfully deleted." });
    })
    .catch((err) => console.log(err));
};
