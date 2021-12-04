import { validateLink, validate, validateLength } from './validation'

describe('validation.js', () => {
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

    const curriedValidate = validateLink();

    it('should return true for valid inputs', () => {
      for (let link of validLinks) {
        expect(curriedValidate(link)).toBe(true);
      }
    });

    it('should return false for invalid inputs', () => {
      for (let link of invalidLinks) {
        expect(curriedValidate(link)).toBe(false);
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
        expect(validateLength(val)(key)).toBe(true);
      });
    });

    it('should return false for invalid inputs', () => {
      Object.entries(invalidInputs).forEach(([key, val]) => {
        expect(validateLength(val)(key)).toBe(false);
      });
    })
  });

  describe('validate', () => {
    const validInputs = {
      'abcde': validateLength(),
      'https://www.google.com': validateLink(),
    };

    const invalidInputs = {
      'abcde f': validateLength(),
      'htts://www.google.com': validateLink(),
    }

    it('should return true for inputs that pass their validity test', () => {
      Object.entries(validInputs).forEach(([key, val]) => {
        expect(validate(key, [val])).toBe(true);
      });
    });
    
    it('should return false for inputs that fail their validity test', () => {
      Object.entries(invalidInputs).forEach(([key, val]) => {
        expect(validate(key, [val])).toBe(false);
      });
    })
  });
});