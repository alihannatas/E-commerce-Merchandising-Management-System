const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin");

router.post("/products", adminController.addProduct);

// router.get("/products/:id", adminController.getProduct);

// router.put("/products/:id", adminController.updateProduct);

// router.delete("/products/:id", adminController.deleteProduct);

router
  .get("/products/:id", adminController.getProduct)
  .put("/products/:id", adminController.updateProduct)
  .delete("/products/:id", adminController.deleteProduct);

module.exports = router;
