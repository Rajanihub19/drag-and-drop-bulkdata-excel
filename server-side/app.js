const express = require("express");
const { catgRoutes } = require("./apis/routes/category-routes");
const cors = require("cors");
const productRoutes = require("./apis/routes/product-routes");

require("dotenv").config();
require("./dbConnection");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/catg-api", catgRoutes);
app.use("/product-api", productRoutes);
app.listen(process.env.PORT, () => {
  console.log(`listening port ${process.env.PORT}`);
});
