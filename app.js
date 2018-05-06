const express = require('express');

const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose-test');
mongoose.Promise = global.Promise;

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

const Car = mongoose.model('Car', CarSchema);

//validation will catch an error, because year is not between the range specified
try{
  let ferrari = Car.create({model: 'ferrari 458', year: 2030});
  
}catch(error){
  console.log(error);
}
