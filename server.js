const MONGO_URI =
  "mongodb+srv://szymus557:tv5oRttVCgjBWrbH@cluster.s3iods9.mongodb.net/";

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/products");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/products", productRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(4400, () => {
      console.log("listening on port", 4400);
    });
  })
  .catch((err) => {
    console.log(err);
  });