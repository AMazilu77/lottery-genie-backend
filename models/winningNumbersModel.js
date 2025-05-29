const mongoose = require('mongoose');

const winningNumberPick2Schema = mongoose.Schema({
  drawDate: { type: String, required: true },
  winningNumber: { type: String, required: true },
  fireball: { type: String, required: true },
  midDay: { type: Boolean },
  evening: { type: Boolean }
});

const winningNumberPick3Schema = mongoose.Schema({
  drawDate: { type: String, required: true },
  winningNumber: { type: String, required: true },
  fireball: { type: String, required: true },
  midDay: { type: Boolean },
  evening: { type: Boolean }
});

const winningNumberPick4Schema = mongoose.Schema({
  drawDate: { type: String, required: true },
  winningNumber: { type: String, required: true },
  fireball: { type: String, required: true },
  midDay: { type: Boolean },
  evening: { type: Boolean }
});

const winningNumberPick5Schema = mongoose.Schema({
  drawDate: { type: String, required: true },
  winningNumber: { type: String, required: true },
  fireball: { type: String, required: true },
  midDay: { type: Boolean },
  evening: { type: Boolean }
});

///FL lotto  schema
const FL_Lotto = new mongoose.Schema({
  drawDate: { type: Date, required: true },
  numbers: [Number],
  implementationYear: Number
});

const FL_Fantasy5 = new mongoose.Schema({
  drawDate: { type: String, required: true },
  drawType: { type: String, enum: ['MIDDAY', 'EVENING'], required: true },
  numbers: { type: [Number], required: true }
});

///FL lotto  schema
const Cash4LifeSchema = new mongoose.Schema({
  drawDate: {
    type: String,
    required: true
  },
  mainNumbers: {
    type: [Number],
    required: true
  },
  cashBall: {
    type: Number,
    required: true
  }
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
const WinningPick4 = mongoose.model('WinningPick4', winningNumberPick4Schema);
const WinningPick5 = mongoose.model('WinningPick5', winningNumberPick5Schema);
const WinningFL_Lotto = mongoose.model('WinningFL_Lotto', FL_Lotto);
const WinningFL_Fantasy5 = mongoose.model('WinningFL_Fantasy5', FL_Fantasy5);
const WinningCashForLife = mongoose.model('WinningCashForLife', Cash4LifeSchema);

const WinningMegaMillions = mongoose.model('WinningMegaMillions', megaMillionsSchema);
const WinningPowerball = mongoose.model('WinningPowerball', WinningPowerballSchema);

module.exports = {
  WinningPick2,
  WinningPick3,
  WinningPick4,
  WinningPick5,
  WinningFL_Lotto,
  WinningFL_Fantasy5,
  WinningCashForLife,
  WinningMegaMillions,
  WinningPowerball
};
