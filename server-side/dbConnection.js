const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then((value) => {
    console.log("Database connected...");
  })
  .catch((error) => {
    console.log("Database connection failed: ", error);
  });

console.log("mongoose connection...");
