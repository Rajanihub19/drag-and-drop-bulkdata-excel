require("dotenv").config();

const {
  postCatgData,
  getCatgData,
  deleteData,
  putData,
  getPaginationData,
} = require("../modal/categoryModal");

const postDataController = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  const data = req.json?.map((obj) => {
    const subCategory = obj["Sub-category"]
      .split(",")
      .map((catg) => ({ name: catg.trim() }));
    return {
      category: obj.Category,
      subCategory,
    };
  });
  console.log("post req body: ", data);

  result = await postCatgData(data);

  res.send(result);
};

const getDataController = async (req, res) => {
  const result = await getCatgData(req.query.id);
  res.send(result);
};

const getPaginationController = async (req, res) => {
  const skip = req.params.skip;
  const limit = req.params.limit;

  const result = await getPaginationData(skip, limit);
  res.send(result);
};

const deleteDataController = async (req, res) => {
  console.log(req.params);
  const result = await deleteData(req.params.id);
  res.send(result);
};

const putDataController = async (req, res) => {
  console.log("params:====", req.params);
  console.log("putController body:----", req.body);
  const result = await putData(req.params.id, req.body);
  res.send(result);
};

module.exports = {
  postDataController,
  getDataController,
  getPaginationController,
  deleteDataController,
  putDataController,
};
