import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import Url from './models/url';

mongoose.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017/shortnr');

async function empty() {
  console.log("Clearing all urls from database...");
  await Url.deleteMany();
}

empty().then(() => {
  console.log("Database cleared successfully");
  mongoose.connection.close();
})