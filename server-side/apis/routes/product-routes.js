const express = require("express");
const { uploadFile } = require("../middleware/upload-file");
const { convertExcelToJson } = require("../middleware/excel-to-json");
const {
  postProductController,
  getProductController,
} = require("../controller/productController");
const productRoutes = express.Router();

productRoutes.post(
  "/bulk-post",
  uploadFile,
  convertExcelToJson,
  postProductController
);

productRoutes.get("/get-product/:skip/:limit", getProductController);
module.exports = productRoutes;
