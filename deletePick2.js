const mongoose = require('mongoose');
require('dotenv').config();

const Pick2 = require('./models/winningNumbersModel');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  return Pick2.deleteMany({});
}).then(() => {
  console.log('🔥 Pick2 records deleted');
  mongoose.disconnect();
});
