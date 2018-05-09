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
  }
});

CarSchema.pre('save', async function(){
  this.model = await this.model.toUpperCase();
});

const Car = mongoose.model('Car', CarSchema);


router.post('/', async (request, response) => {
  try{
    const car = await Car.create(request.body);
    response.send({car});
    
  }
  catch(error){
    response.status(400).send({ error: 'error'})
  }  
});

router.get('/', async (request, response) => {
  try{
     Car.find({}, (error, results) => {
      if(error){
          return response.status(400).send({error: 'something is wrong...'})
      }

      response.send({ results });

    });


  }
  catch (error){
    response.status(400).send({error: 'something is wrong...'})
  }
});


app.use(router)
