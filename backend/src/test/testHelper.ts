import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Url from '../models/url';

export async function connectAndEmpty() {
  try {
    await mongoose.connect(process.env.MONGO_URL ?? 'mongodb://localhost:27017/shortnr')
    await Url.deleteMany({});
  } catch (e: any) {
    console.error(`Error connecting to MongoDB: ${e.message}`)
  }
}

export async function createUrl(origin = 'test', id: string) {
  const url = await Url.create({ origin, _id: new mongoose.Types.ObjectId(id) });
  return url;
}

export async function empty() {
  await Url.deleteMany({});
}

export async function closeConnection() {
  await mongoose.connection.close();
}