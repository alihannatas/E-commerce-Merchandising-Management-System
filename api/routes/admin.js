const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin");
const validationMiddleware = require("../middleware/validation");

router.get("/products/filter", adminController.getFilteredProducts);

router.post(
  "/products",
  validationMiddleware.validateProduct,
  adminController.addProduct
);

router.get("/products", adminController.getProducts);

router.get("/products/:id", adminController.getProduct);

router.put("/products/:id", adminController.updateProduct);

router.delete("/products/:id", adminController.deleteProduct);

router.get("/categories", adminController.getCategory);

router.post(
  "/categories/add",
  validationMiddleware.validateCategory,
  adminController.addCategory
);
router.delete("/categories/delete/:id", adminController.deleteCategory);

router.get("/products/category/:id", adminController.getProductWithCategory);

module.exports = router;
