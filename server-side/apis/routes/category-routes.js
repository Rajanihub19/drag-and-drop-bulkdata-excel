const express = require("express");
const {
  postDataController,
  getDataController,
  getPaginationController,
  deleteDataController,
  putDataController,
} = require("../controller/categoryController");
const { convertExcelToJson } = require("../middleware/excel-to-json");
const { uploadFile } = require("../middleware/upload-file");
// const { jsonToExcel } = require("../middleware/json-to-excel");
const catgRoutes = express.Router();

// catgRoutes.use("/download-excel", jsonToExcel, express.static("storage"));

catgRoutes.post("/post", postDataController);

catgRoutes.post(
  "/bulk-post",
  uploadFile,
  convertExcelToJson,
  postDataController
);

catgRoutes.get("/get", getDataController);

catgRoutes.get("/get/:skip/:limit", getPaginationController);

// catgRoutes.get("/json-to-excel/:skip/:limit", jsonToExcel, (req, res) => {
//   res.send(req.excelConverted);
// });

catgRoutes.delete("/delete/:id", deleteDataController);

catgRoutes.put("/put/:id", putDataController);

module.exports = { catgRoutes };
