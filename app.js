const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose-test');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server On!')
})

const CarSchema = new mongoose.Schema({
  model: {
    type: String    
  },
  year: {
    type: Number,
    min: 1990,
    max: 2018
  },
  category: {
    type: String,
    required: true,
    enum: ['Sportive', 'SUV', 'Pick-up', 'Hach']
  }
});

CarSchema.pre('save', async function(){
  this.model = await this.model.toUpperCase();
});

const Car = mongoose.model('Car', CarSchema);


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


router.get('/cars/:id', (request, response) => {
  try{
    const id = mongoose.mongo.ObjectId(request.params.id);

    //WITH CALLBACK
    // Car.findOne({_id : id}, (error, results) => {
    //   if (error)
    //     return response.status(404).send({ error: error })
    //   response.send({ results });
    // }); 

    //WITHOUT CALLBACK
    const car = Car.findOne({ _id: id });
    car.exec((error, results) => {
        if (error)
          return response.status(404).send({ error: error })
        response.send({ results });
    });

  }

  catch (error){
    return response.status(400).send(error);
  }

});


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

app.use(router)
