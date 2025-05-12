const fs = require('fs');
const mongoose = require('mongoose');
const { WinningPick3 }  = require('../../../models/winningNumbersModel');
require('dotenv').config();

const data = JSON.parse(fs.readFileSync('bin/scripts/seeds/pick3_seed_data.json', 'utf8'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  return WinningPick3.insertMany(data);
}).then(() => {
  console.log('✅ Pick 3 seed complete!');
  mongoose.disconnect();
}).catch((err) => {
  console.error('❌ Seeding failed:', err);
  mongoose.disconnect();
});
