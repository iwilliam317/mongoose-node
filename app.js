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

let ferrari = new Car({model: 'ferrari 458', year: 2015});
console.log(ferrari)
