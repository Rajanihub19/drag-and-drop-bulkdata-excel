const multer = require("multer");
const path = require("path");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const temp = file.originalname.split(".").pop();
    console.log("file ext. ", temp);
    cb(null, "storage");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // const extension = path.extname(file.originalname).toLowerCase();
  const temp = file.originalname.split(".").pop();
  console.log("file abcd: ", temp);
  // console.log("extension: ", extension);
  if (temp !== "xlsx") {
    req.fileValidationError = {
      error: "Only Excel file is allowed!",
      status: 400,
    };
    return cb(new Error("Only Excel file is allowed!"), false);
  }
  cb(null, true);
};

const uploadExcelFile = multer({
  // fileFilter,
  storage: fileStorage,
});

const uploadFile = uploadExcelFile.single("file");

module.exports = { uploadFile };
