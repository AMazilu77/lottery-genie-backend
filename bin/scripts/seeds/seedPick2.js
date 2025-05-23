module.exports = [
  {
    drawDate: '2025-05-08',
    winningNumber: '44',
    fireball: '3',
    midDay: false,
    evening: true
  },
  {
    drawDate: '2025-04-12',
    winningNumber: '44',
    fireball: '6',
    midDay: true,
    evening: false
  },
  {
    drawDate: '2025-04-11',
    winningNumber: '75',
    fireball: '1',
    midDay: false,
    evening: true
  },
  {
    drawDate: '2025-05-07',
    winningNumber: '52',
    fireball: '2',
    midDay: false,
    evening: true
  },
  {
    drawDate: '2025-04-11',
    winningNumber: '84',
    fireball: '1',
    midDay: true,
    evening: false
  }
];


// const mongoose = require('mongoose');
// const { WinningPick2 } = require('../../../models/winningNumbersModel');
// require('dotenv').config(); // so MONGO_URI works

// const seedData = [
//   {
//     drawDate: '2025-05-08',
//     winningNumber: '44',
//     fireball: '3',
//     midDay: false,
//     evening: true,
//   },
//   {
//     drawDate: '2025-04-12',
//     winningNumber: '44',
//     fireball: '6',
//     midDay: true,
//     evening: false,
//   },
//   {
//     drawDate: '2025-04-11',
//     winningNumber: '75',
//     fireball: '1',
//     midDay: false,
//     evening: true,
//   },
//   {
//     drawDate: '2025-05-07',
//     winningNumber: '52',
//     fireball: '2',
//     midDay: false,
//     evening: true,
//   },
//   {
//     drawDate: '2025-04-11',
//     winningNumber: '84',
//     fireball: '1',
//     midDay: true,
//     evening: false,
//   }
// ];

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('🧞 Djinn connected to the database...');
//   return WinningPick2.insertMany(seedData);
// })
// .then((docs) => {
//   console.log('Pick 2 seed data inserted!', docs);
//   return mongoose.disconnect();
// })
// .catch((err) => {
//   console.error('Seeding failed:', err);
//   mongoose.disconnect();
// });
