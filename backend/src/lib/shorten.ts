import Url, { UrlModel } from '../models/url';

export function generateRandomString(length = 5) {
  const allLetters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const allLettersLength = allLetters.length;
  let final = '';
  for (let i = 0; i < length; i++) {
    let randomChar = Math.floor(Math.random() * allLettersLength);
    final += allLetters[randomChar];
  }
  return final;
}

export async function generateShortUrl(url: UrlModel) {
  const id = url._id.toString();
  let short = id.slice(-5);
  let res = await Url.findOne({ short });
  let max = -6;
  while (res && Math.abs(max) < id.length) {
    short = id.slice(max, max + 5);
    res = await Url.findOne({ short });
    max--;
  }
  if (Math.abs(max) === id.length && res) {
    for (let i = 0; i < 10e8; i++) {
      short = generateRandomString();
      res = await Url.findOne({ short });
      if (!res) break;
    }
  }
  if (res) throw new Error('Unable to generate shortened url');
  return short;
}
