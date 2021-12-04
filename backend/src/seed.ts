import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import Url from './models/url';

mongoose.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017/shortnr');

async function seed() {
  console.log("Clearing all urls from database...");
  await Url.deleteMany();

  const shorts = [
    { "https://www.reddit.com": "apS6k" },
    { "https://www.google.com": "Z8y2w" },
    { "https://www.npmjs.com": "eFBIV" },
    { "https://www.python.org": "KtJEp" },
    { "https://pypi.org": "skSPm" },
  ];
  for (let i = 0; i < shorts.length; i++) {
    const [key, val] = Object.entries(shorts[i])[0];
    console.log(`Generating URL ${i + 1}/${shorts.length} for ${key}.`);
    await Url.create({ origin: key, short: val });
  }
  console.log("Urls generation complete.");
}

seed().then(() => {
  console.log("Closing connection.");
  mongoose.connection.close();
});
