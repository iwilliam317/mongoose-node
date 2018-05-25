const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

//for object id
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const server = app.listen(3000, () => {
  console.log('Server On!')
})

module.exports = server;


const Car = require('./models/car');

//CREATE
router.post('/cars', async (request, response) => {
  try{
    //CREATE IS CALLED DIRECT WITH THE MODEL
    // const car = await Car.create(request.body);
    // response.send({car});

    //SAVE IS CALLED FROM THE INSTANCE
    const car = new Car(request.body);
    car.save((error, result) => {
      if (error)
        return response.status(400).send({ error: error.message });

      response.send(car);

    });
    
  }
  catch(error){
    response.status(400).send({ error: 'error'})
  }  
});


//READ
router.get('/cars', async (request, response) => {
  try{

    //QUERY WITH CALLBACK

    //  Car.find({}, (error, results) => {
    //   if(error){
    //       return response.status(400).send({error: 'something is wrong...'})
    //   }
    //   response.send({ results });
    // });

    //QUERY WITH NO CALLBACK
    const cars = Car.find({});

    cars.select('model category');

    cars.exec((error, results) => {
      if(error)
        return response.status(400).send({ error: error })

      response.send({ results });
    });
  }
  catch (error){
    response.status(400).send({error: 'something is wrong...'})
  }

});

//READ
router.get('/cars/:id', async (request, response) => {
  try{
    const id = mongoose.mongo.ObjectId(request.params.id);
    
    //WITH CALLBACK
    Car.findOne({_id : id}, (error, results) => {
      if (error)
        return response.status(404).send({ error: error })
      response.send({ results });
    }); 

    //WITHOUT CALLBACK
    // const car = await Car.findOne({ _id: id });
    // await car.exec((error, results) => {
    //     if (error)
    //       return response.status(404).send({ error: error })
    //     response.send({ results });
    // });

  }

  catch (error){
    return response.status(400).send(error);
  }

});

//UPDATE
router.put('/cars/:id', async (request, response) => {
  try{

    const id = mongoose.mongo.ObjectId(request.params.id);

    const { model, year, category } = request.body;

    await Car.update( {_id: id }, request.body,  (error, car) => {
      if (error)
        return response.status(400).send({ error });

      response.send({ car });

    });
  }
  catch (error){
    return response.status(400).send({ error });
  }

});

//DELETE
router.delete('/cars/:id', async (request, response) => {
  const id = mongoose.mongo.ObjectId(request.params.id);

  await Car.deleteOne({_id : id}, (error) => {
    if (error)
      return response.status().send({ error });

    response.send({ message: 'Successfuly removed! '})
  });
});

app.use(router);
