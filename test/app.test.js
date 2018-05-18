const app = require('../app');

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

const Car = require('../models/car');


chai.use(chaiHttp);

describe('API /cars', () => {

  let car;

  describe('GET /cars', () => {
    before((done) =>{
      // console.log('creating car for tests')
      car = Car.create( { model: 'Ferrari 458 Italia', year: 2017, category: 'Sportive' } )
      done();
    });

    after((done) => {
      Car.remove({}, error => {
        if (error)
            console.log('error')

      });
      done();
    });

    it('returns status code 200', done => {
      chai.request(app).get('/cars')
        .end( (error, response) => {
          expect(response.status).to.be.equal(200);
         done();
        });
    });

    it('returns response ok true', done => {
      chai.request(app).get('/cars')
        .end( (error, response) =>{
           expect(response.ok).to.be.true;
           done();
        });
    });

    it('returns car', done => {
      chai.request(app).get('/cars')
        .end((error, response) => {
          // console.log(response.body)
          // console.log(response.body.results[0].model)
          expect(response.body.results[0].model).to.be.equal('FERRARI 458 ITALIA');
          expect(response.body.results[0].category).to.be.equal('Sportive');

          done();
        });
    });

  });

})