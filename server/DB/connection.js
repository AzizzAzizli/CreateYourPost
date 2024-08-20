const mongoose = require("mongoose");
require("dotenv").config();
const dbURL = process.env.MONGODB_URI.toString();

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("DB Errror: ", err);
  });
