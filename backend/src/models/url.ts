import mongoose from 'mongoose';

import { LINK_REGEX } from '../lib/constants';

export interface UrlModel {
  _id: mongoose.Types.ObjectId,
  origin: string,
  short: string
}

const urlSchema = new mongoose.Schema({
  origin: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v: string) {
        return LINK_REGEX.test(v);
      },
      message: (props: any) => `${props.value} is not a valid URL`
    }
  },
  short: {
    type: String,
    unique: true,
    length: 5
  },
});

export default mongoose.model<UrlModel>("url", urlSchema);