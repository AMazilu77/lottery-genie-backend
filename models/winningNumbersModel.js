const mongoose = require('mongoose');

const winningNumberPick2Schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  drawDate: { type: String, required: true },
  winningNumber: { type: String, required: true },
  fireball: { type: String, required: true },
  midDay: { type: Boolean },
  evening: { type: Boolean }
});

const winningNumberPick3Schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  drawDate: { type: String, required: true },
  winningNumber: { type: String, required: true },
  fireball: { type: String, required: true },
  midDay: { type: Boolean },
  evening: { type: Boolean }
});


///mega millions schema
const megaMillionsSchema = new mongoose.Schema({
  drawDate: { type: Date, required: true },
  numbers: [Number],
  megaBall: Number,
  implementationYear: Number
});

// winning powerball schema
const WinningPowerballSchema = new mongoose.Schema({
  drawDate: { type: Date, required: true },
  winningNumber1: Number,
  winningNumber2: Number,
  winningNumber3: Number,
  winningNumber4: Number,
  winningNumber5: Number,
  powerBall: Number,
  multiplier: { type: Number, default: null },
  gameVersion: { type: String, required: true }
});



const WinningPick2 = mongoose.model('WinningPick2', winningNumberPick2Schema);
const WinningPick3 = mongoose.model('WinningPick3', winningNumberPick3Schema);

const WinningMegaMillions = mongoose.model('WinningMegaMillions', megaMillionsSchema);
const WinningPowerball = mongoose.model('WinningPowerball', WinningPowerballSchema);

module.exports = {
  WinningPick2,
  WinningPick3,
  WinningMegaMillions,
  WinningPowerball
};
