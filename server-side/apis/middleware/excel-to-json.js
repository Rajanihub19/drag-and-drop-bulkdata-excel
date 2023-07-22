const XLSX = require("xlsx");
const fs = require("fs");
const convertExcelToJson = async (req, res, next) => {
  if (!req.file) next();

  console.log("excel: ", req.file);
  const workbook = XLSX.readFile(req.file.path);
  const sheetName = workbook.SheetNames[0];
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const jsonString = JSON.stringify(sheetData);
  const jsonObj = JSON.parse(jsonString);

  // const finalData = jsonObj.map((val, index) => ({
  //   name: val.Name,
  //   email: val.Email,
  //   age: val.Age,
  //   contact: val.Contact,
  // }));

  fs.unlink(req.file.path, (err) => {
    err
      ? console.log("there was an error:", err)
      : console.log("successfully deleted: ", req.file.filename);
  });

  req.json = jsonObj;
  next();
};

module.exports = { convertExcelToJson };
