const Product = require("../model/products");
const Category = require("../model/category");

exports.validateProduct = async (req, res, next) => {
  const { title, categoryId, stockQuantity } = req.body;

  const errors = [];

  if (!title || title.length === 0) {
    errors.push({ field: "title", message: "Title cannot be empty." });
  } else if (title.length > 200) {
    errors.push({
      field: "title",
      message: "Title cannot exceed 200 characters.",
    });
  }

  idControl = await Category.findByPk(categoryId);
  if (!categoryId || isNaN(categoryId) || !idControl) {
    errors.push({ field: "categoryId", message: "Invalid category ID." });
  }

  if (!stockQuantity || isNaN(stockQuantity) || stockQuantity < 0) {
    errors.push({ field: "stockQuantity", message: "Invalid stock quantity." });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

exports.validateCategory = (req, res, next) => {
  const { name } = req.body;

  const errors = [];

  if (!name || name.length === 0) {
    errors.push({ field: "name", message: "Category name cannot be empty." });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
