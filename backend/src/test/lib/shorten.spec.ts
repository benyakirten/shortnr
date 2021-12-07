import assert from 'assert';

import { connectAndEmpty, closeConnection, empty, createUrl } from "../testHelper";
import { generateRandomString, generateShortUrl } from '../../lib/shorten';

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
    before(async () => {
      await connectAndEmpty();
    });

    afterEach(async () => {
      await empty();
    })

    after(async () => {
      await closeConnection();
    });

    it('should generate a 5-character-long string from last few letters of the the input\'s _id', async () => {
      const newUrl = await createUrl('https://www.test.com', '123456789012345678901234');
      const res = await generateShortUrl(newUrl);
      assert.equal(res, '01234');
    });

    // The following tests have been commented because, even though 
    it('should attempt to generate the short url moving back from the end of the input id if the id is already taken', async () => {
      const originalId = '12e4567a901bcde678901234';
      let id = originalId;
      for (let i = 0; i < id.length - 6; i++) {
        // Generate URL in a normal fashion with short and save it (like /api POST would do)
        // First URL should have ID 123e567a901bcde678901234 and short 01234
        // Second URL should have ID 4123e567a901bcde67890123 and short 90123
        const url = await createUrl(`https://www.${i.toString()}.com`, id);
        url.short = await generateShortUrl(url);
        await url.save();
        
        // Test to see if the generateShortURL goes down the list
        const res = await generateShortUrl({ _id: originalId } as any);
        const lastRelevantDigit = originalId.length - 1 - i;
        assert.equal(res, originalId.slice(lastRelevantDigit - 5, lastRelevantDigit));
        // Move ID down 1 number and loop it back to the beginning
        id = id.slice(-1) + id.slice(0, -1);
      }
    });

    it('should call generateRandomString when there are no more valid short URLs to be generated from the id', async () => {
      const generateList = [];
      const originalId = '12e4567a901bcde678901234';
      let id = originalId;
      for (let i = 0; i < id.length; i++) {
        const url = await createUrl(`https://www.${i.toString()}.com`, id);
        url.short = await generateShortUrl(url);
        await url.save();

        const generated = await generateShortUrl({ _id: originalId } as any);
        generateList.push(generated);
        id = id.slice(-1) + id.slice(0, -1);
      }
      
      const randomlyGeneratedList = generateList.slice(-6);
      for (let randomString of randomlyGeneratedList) {
        assert.equal(originalId.includes(randomString), false);
      }
    });
  });
});