const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
  },
});

const categorySchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subCategory: [subCategorySchema],
});

const categoryModal = mongoose.model(process.env.COLLECTION, categorySchema);

const postCatgData = async (values) => {
  console.log("post data: ", values);
  try {
    const data = await categoryModal.create(values);
    return { data, message: "success", status: 200, success: true };
  } catch (error) {
    console.log("Post data error: ", error);
    return { error: error.message, status: 400, success: false };
  }
};

const pushNewCatg = async (id, value) => {
  try {
    const data = await categoryModal.findByIdAndUpdate(
      id,
      {
        $push: { subCategory: { name: value } },
      },
      { new: true }
    );
    const dataNow = {
      _id: data._id,
      subCategory: data.subCategory.filter((val) => val.name === value),
    };
    console.log("skdflkdsjfkldsjklfjsklfjdslk: ", data);
    return { data: dataNow, status: 200, success: true };
  } catch (error) {
    return { error: error.message, status: 400, success: false };
  }
};

const getCatgData = async (catg) => {
  try {
    const data = await categoryModal.findOne(
      { category: catg },
      { _id: 1, category: 1, subCategory: 1 }
    );
    return { data, message: "success", status: 200 };
  } catch (error) {
    return { error, message: "error", status: 400 };
  }
};

const getSubCatgData = async (catgId, subcatg) => {
  try {
    const data = await categoryModal.findOne(
      {
        subCategory: { $elemMatch: { name: subcatg } },
      },
      { subCategory: 1 }
    );
    console.log(" temp subcatg: ", temp);
    return { data, message: "success", status: 200 };
  } catch (error) {
    return { error, message: "error", status: 400 };
  }
};

const getDataByQuery = async (query, skip, limit) => {
  try {
    const data = await categoryModal
      .find({
        $or: [
          { name: { $regex: query } },
          { email: { $regex: query } },
          { workers: { $regex: query } },
        ],
      })
      .skip(skip)
      .limit(limit);

    const length = await categoryModal
      .find({
        $or: [
          { name: { $regex: query } },
          { email: { $regex: query } },
          { workers: { $regex: query } },
        ],
      })
      .count();

    return {
      data,
      message: "success",
      status: 200,
      length,
    };
  } catch (error) {
    return { data: error, message: "error", status: 400 };
  }
};

const getPaginationData = async (skip, limit) => {
  try {
    const data = await categoryModal
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    const length = await categoryModal.count();
    return {
      data,
      message: "success",
      status: 200,
      length,
    };
  } catch (error) {
    return { error, message: "error", status: 400 };
  }
};

const deleteData = async (id) => {
  try {
    const data = await categoryModal.findByIdAndDelete(id);
    return { data, message: "success", status: 200 };
  } catch (error) {
    return { error, message: "error", status: 400 };
  }
};

const putData = async (id, values) => {
  console.log("put:----- ", values);
  try {
    const data = await categoryModal.findByIdAndUpdate(id, values);
    return { data, message: "success", status: 200 };
  } catch (error) {
    return { error, message: "error", status: 400 };
  }
};
module.exports = {
  postCatgData,
  getCatgData,
  deleteData,
  putData,
  getPaginationData,
  getDataByQuery,
  getSubCatgData,
  pushNewCatg,
};
