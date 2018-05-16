const mongoose = require('../database');

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

module.exports = Car;