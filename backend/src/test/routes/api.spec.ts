import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';
import { connectAndEmpty, createUrl } from '../testHelper';

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('api routes', () => {
  before(async () => {
    await connectAndEmpty();
    const url = await createUrl('https://www.abc.com', '123456789012345678901234')
    url.short = 'abcde';
    await url.save();
  });
  
  describe('/api/:link GET', () => {
    it('should return a 400 error if the requested link does not meet validation requirements', () => {
      chai.request(app)
        .get('/api/abcd')
        .end((_, res) => {
          res.should.have.status(400);
          expect(res.body.error).to.equal('Short links must be 5 characters long')
        });
    });

    it('should return a URL origin and short versions if the short version already exists in the database', async () => {
      chai.request(app)
        .get('/api/abcde')
        .end((_, res) => {
          res.should.have.status(200);
          res.should.be.json;
          expect(res.body.origin).to.equal('https://www.abc.com');
          expect(res.body.short).to.equal('abcde');
        });
    });

    it('should return a 406 error if the short version does not exist in the database', () => {
      chai.request(app)
        .get('/api/fghij')
        .end((_, res) => {
          res.should.have.status(406);
          expect(res.body.error).to.equal('Full link not found');
        });
    });
  });

  describe('/api POST', () => {
    it('should return a 400 errr if the link cannot be properly validated', () => {
      chai.request(app)
        .post('/api')
        .send({ link: 'test' })
        .end((_, res) => {
          res.should.have.status(400);
          expect(res.body.error).to.equal('Link is not properly formed');
        });
    });

    it('should create and return a new URL model if the origin URL doesn\'t yet exist in the database', () => {
      chai.request(app)
        .post('/api')
        .send({ link: 'https://www.google.com' })
        .end((_, res) => {
          res.should.have.status(201);
          expect(res.body.origin).to.equal('https://www.google.com');
        });
    });

    it('should return a preexisting URL model if the origin URL already exists in the database', () => {
      chai.request(app)
        .post('/api')
          .send({ link: 'https://www.abc.com' })
          .end((_, res) => {
            res.should.have.status(200);
            expect(res.body.origin).to.equal('https://www.abc.com');
            expect(res.body.short).to.equal('abcde');
          });
    });
  });
})