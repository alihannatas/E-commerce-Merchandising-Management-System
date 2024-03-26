const express = require("express");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use("/api/products/:id", (req, res, next) => {
  const id = req.params.id;

  res.json({ hello: "hello world", id: id });
});

app.listen(3000);
