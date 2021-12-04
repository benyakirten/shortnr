import assert from 'assert';

import { validateLink, validateLength } from '../../lib/validation';

describe('validation.ts', () => {
  describe('validateLink', () => {
    const validLinks = [
      'https://www.gatherly.io',
      'https://www.google.com',
      'https://www.npmjs.com',
      'https://www.python.org',
      'https://pypi.org'
    ];

    const invalidLinks = [
      'A',
      '!!!!',
      'htt:/www.gatherly.io/'
    ]

    it('should return true for valid inputs', () => {
      for (let link of validLinks) {
        assert.equal(validateLink(link), true);
      }
    });

    it('should return false for invalid inputs', () => {
      for (let link of invalidLinks) {
        assert.equal(validateLink(link), false);
      }
    });
  });

  describe('validateLength', () => {
    const validInputs = {
      'abcde': 5,
      ' abcde': 5,
      '   abcde': 5,
      '   abcde   ': 5,
      'abcde   ': 5,
      ' abc ': 3,
      'abc': 3,
    }

    const invalidInputs = {
      'abcd': 5,
      ' abc': 4,
      'a b c': 5
    }

    it('should return true for valid inputs', () => {
      Object.entries(validInputs).forEach(([key, val]) => {
        assert.equal(validateLength(key, val), true);
      });
    });

    it('should return false for invalid inputs', () => {
      Object.entries(invalidInputs).forEach(([key, val]) => {
        assert.equal(validateLength(key, val), false);
      });
    })
  });
});