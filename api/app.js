const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv").config();

const db = require("./util/database");
const Product = require("./model/products");
const Category = require("./model/category");

const adminRouter = require("./routes/admin");

const app = express();

app.use(bodyParser.json());

app.use("/api", adminRouter);

Product.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Product, { foreignKey: "categoryId" });

const port = process.env.PORT || 3000;
db.sync()
  .then((answerDb) => {
    //  console.log("Db connection is succesfully",answerDb);
    app.listen(3000, () => console.log("Server started at port 3000."));
  })
  .catch((err) => console.log(err));
