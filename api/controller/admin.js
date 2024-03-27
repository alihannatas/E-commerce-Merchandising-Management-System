const Product = require("../model/products");
const Category = require("../model/category");
const { where, Op } = require("sequelize");

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
      res.status(201).json(product);
    })
    .catch((err) => console.log(err));
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.findAll()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => console.log(err));
};

exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByPk(id)
    .then((product) => {
      res.status(200).json(product);
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
      res.status(200).json({ message: "Product succesfully updated." });
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
      res.status(204).json({ message: "Product succesfully deleted." });
    })
    .catch((err) => console.log(err));
};

exports.addCategory = async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.create({
    name,
  })
    .then((category) => {
      console.log(category);
      res.status(201).json(category);
    })
    .catch((err) => console.log(err));
};

exports.getCategory = async (req, res, next) => {
  const category = await Category.findAll()
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => console.log(err));
};

exports.deleteCategory = async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log(result);
      res.status(204).json({ message: "Product succesfully deleted." });
    })
    .catch((err) => console.log(err));
};

exports.getProductWithCategory = async (req, res, next) => {
  const categoryId = req.params.id;
  const products = await Product.findAll({ where: { categoryId: categoryId } })
    .then((products) => {
      console.log(products);
      res.status(200).json(products);
    })
    .catch((err) => console.log(err));
};

exports.getFilteredProducts = async (req, res, next) => {
  let { keyword, minStockQuantity, maxStockQuantity } = req.query;
  if (!keyword) keyword = "";
  if (!minStockQuantity) minStockQuantity = Number.MIN_VALUE;
  if (!maxStockQuantity) maxStockQuantity = Number.MAX_VALUE;

  const filteredProducts = await Product.findAll({
    where: {
      [Op.or]: {
        title: { [Op.iLike]: keyword },
        description: { [Op.iLike]: keyword },
        stockQuantity: { [Op.between]: [minStockQuantity, maxStockQuantity] },
      },
    },
  })
    .then((filteredProducts) => {
      res.status(200).json(filteredProducts);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching filtered products." });
    });
};
