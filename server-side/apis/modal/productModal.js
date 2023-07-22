const mongoose = require("mongoose");

// const productSubCatgSchema = mongoose.Schema({
//   subCatgId: {
//     type: mongoose.Schema.Types.ObjectId,
//   },
//   subCatgName: { type: String },
// });

// const productCatgSchema = mongoose.Schema({
//   category: mongoose.Schema({
//     catgId: { type: mongoose.Schema.Types.ObjectId },
//     catgName: { type: String },
//   }),
//   subCategory: [productSubCatgSchema],
// });

// const productSchema = mongoose.Schema({
//   productName: { type: String },
//   productDesc: String,
//   category: [productCatgSchema],
// });

const productSchema = mongoose.Schema({
  "Product Name": {
    type: String,
    required: true,
  },
  "Category Id": { type: mongoose.Schema.Types.ObjectId, required: true },
  "Sub-category Id": { type: mongoose.Schema.Types.ObjectId, required: true },
});

const productModal = mongoose.model("products", productSchema);

const postProductData = async (value) => {
  console.log("post product: ", value);
  try {
    const data = await productModal.create(value);
    return { data, status: 200 };
  } catch (error) {
    console.log("Post Error: ", error.message);
    return { error, status: 400 };
  }
};

const getProductData = async (value) => {
  try {
    const data = await productModal.find({ "Product Name": value });
    return { data, status: 200 };
  } catch (error) {
    console.log("Post Error: ", error.message);
    return { error, status: 400 };
  }
};

const getProduct = async (skip, limit) => {
  try {
    const data = await productModal.aggregate([
      { $sort: { _id: -1 } },
      { $skip: parseInt(skip) },
      { $limit: limit && limit != 0 ? parseInt(limit) : 5 },
      {
        $lookup: {
          from: "categories",
          foreignField: "_id",
          localField: "Category Id",
          as: "category",
        },
      },
      {
        $project: {
          _id: 1,
          "Product Name": 1,
          "Category Id": 1,
          "Sub-category Id": 1,
          categoryName: {
            $arrayElemAt: ["$category.category", 0],
          },
          subCategory: {
            $arrayElemAt: ["$category.subCategory", 0],
          },
        },
      },
      {
        $project: {
          _id: 1,
          "Product Name": 1,
          "Category Id": 1,
          "Sub-category Id": 1,
          categoryName: 1,
          subCategory: 1,
          index: { $indexOfArray: ["$subCategory._id", "$Sub-category Id"] },
        },
      },
      {
        $project: {
          _id: 1,
          "Product Name": 1,
          "Category Id": 1,
          "Sub-category Id": 1,
          categoryName: 1,
          subCatgDetail: {
            $arrayElemAt: ["$subCategory", "$index"],
          },
        },
      },
      {
        $project: {
          _id: 1,
          "Product Name": 1,
          "Category Id": 1,
          categoryName: 1,
          "Sub-category Id": 1,
          subCatgName: "$subCatgDetail.name",
        },
      },
    ]);

    const length = await productModal.count();

    return { data, length, status: 200 };
  } catch (error) {
    console.log("ERROR: ", error);
    return { error, status: 400 };
  }
};

module.exports = { postProductData, getProductData, getProduct };
