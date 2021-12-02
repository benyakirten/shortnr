const mongoose = require("mongoose");
require("dotenv").config();

const Url = require("./models/url");

mongoose.connect(process.env.MONGO_URL);

async function empty() {
  console.log("Clearing all urls from database...");
  await Url.deleteMany();
}

empty().then(() => {
  console.log("Database cleared successfully");
  mongoose.connection.close();
})