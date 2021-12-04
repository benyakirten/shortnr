import chai from 'chai';
import { connectAndEmpty, empty, closeConnection } from '../testHelper';

const expect = chai.expect;
import Url from '../../models/url';

describe('Url model', () => {
  before(async () => {
    await connectAndEmpty();
  })

  afterEach(async () => {
    await empty();
  })

  after(async () => {
    await closeConnection();
  })

  it('should not be able to be instantiated if the origin value isn\'t a valid link', async () => {
    let failed = false;
    try {
      await Url.create({ origin: 'test' });
    } catch {
      failed = true;
    }
    expect(failed).to.be.true;
  });

  it('should not be able to set the short property if it\'s not a 5-length string', async () => {
    let failed = false;
    try {
      const url = await Url.create({ origin: '' });
      url.short = 'abcd';
      await url.save();
    } catch {
      failed = true;
    }
    expect(failed).to.be.true;
  });

  it('should not be able to be instantiated if the URL is not unique', async () => {
    let failed = false;
    try {
      await Url.create({ origin: 'https://www.google.com' });
      await Url.create({ origin: 'https://www.google.com' });
    } catch {
      failed = true;
    }
    expect(failed).to.be.true;
  });

  it('should not be able to be instantiated if the short URL is not unique', async () => {
    let failed = false;
    try {
      await Url.create({ origin: 'https://www.abc.com', short: 'abcde' });
      await Url.create({ origin: 'https://www.google.com', short: 'abcde' });
    } catch {
      failed = true;
    }
    expect(failed).to.be.true;
  });

  it('should be able to be instantiated if none of the above exceptions are triggered', async () => {
    let failed = false;
    try {
      await Url.create({ origin: 'https://www.google.com', short: 'abcde' });
      await Url.create({ origin: 'https://www.abc.com', short: 'fghijk' });
    } catch {
      failed = true;
    }
    expect(failed).to.be.false;
  })
})