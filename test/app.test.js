const app = require('../app');

const chai = require('chai');

const expect = chai.expect;

const chaiHttp = require('chai-http');

const Car = require('../models/car');


chai.use(chaiHttp);

describe('API /cars', () => {

  let car;
  let x;
  describe('GET /cars', () => {
    before( done =>{
      // console.log('creating car for tests')
      car = Car.create( { model: 'Ferrari 458 Italia', year: 2017, category: 'Sportive' } )
      x = car._id;
      done();
    });

    after( done => {
      Car.remove({}, error => {
         // console.log('cleans car's collection')
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

  describe('GET /cars/:id', async () =>{
    const currentCar = await Car.findOne({ model: 'FERRARI 458 ITALIA'});
    // const id = currentCar._id;
    console.log(currentCar)
    // chai.request(app).get(`/cars/${car._id}`)
    //   .end((error, response) => {
    //     console.log(response.body)
    //   });
  });

})