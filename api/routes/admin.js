const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin");
const validationMiddleware = require("../middleware/validation");

router.post(
  "/products",
  validationMiddleware.validateProduct,
  adminController.addProduct
);

// router.get("/products/:id", adminController.getProduct);

// router.put("/products/:id", adminController.updateProduct);

// router.delete("/products/:id", adminController.deleteProduct);

router
  .get("/products/:id", adminController.getProduct)
  .put(
    "/products/:id",
    validationMiddleware.validateProduct,
    adminController.updateProduct
  )
  .delete("/products/:id", adminController.deleteProduct);

router.post(
  "/categories/add",
  validationMiddleware.validateCategory,
  adminController.addCategory
);
router.delete("/categories/delete/:id", adminController.deleteCategory);

module.exports = router;
