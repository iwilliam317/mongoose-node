const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongoose-test');

mongoose.Promise = global.Promise;

module.exports = mongoose;