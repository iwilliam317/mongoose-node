const app = require('../app');

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');


chai.use(chaiHttp);

describe('API /cars', () => {

  describe('GET /cars', () => {

    it('returns status code 200', (done) => {
      chai.request(app).get('/cars')
        .end( (error, response) => {
          expect(response.status).to.be.equal(200);
         done();
        });
    });

    it('returns response ok true', (done) => {
      chai.request(app).get('/cars')
        .end( (error, response) =>{
           expect(response.ok).to.be.true;
           done();
        });
    });
  });

})