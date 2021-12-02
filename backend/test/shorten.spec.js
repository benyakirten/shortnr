const { generateRandomString, generateShortUrl } = require('../lib/shorten');
const assert = require('assert');

describe('shorten.js', () => {
  describe('generateRandomString', () => {
    it('should generate a random string from the letters A-Za-z0-9 given a certain length', () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const randomString = generateRandomString(5);
      for (let i = 0; i < randomString.length; i++) {
        assert.equal(letters.includes(randomString[i]), true);
      }
    });
  
    it('should return an empty string i the length is <= 0', () => {
      const randomString = generateRandomString(0);
      const randomStringTwo = generateRandomString(-5);
  
      assert.equal(randomString.length, 0);
      assert.equal(randomStringTwo.length, 0);
    });
  });

  describe('generateShortUrl', () => {
    it('should generate a 5-character-long string from last few letters of the the input.id', async (end) => {
      const res = await generateShortUrl({ _id: 12345 });
      assert.equal(res, '12345');
      end();
    });
  });
});