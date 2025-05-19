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

//

///mega millions schema
const megaMillionsSchema = new mongoose.Schema({
  drawDate: { type: Date, required: true },
  numbers: [Number],
  megaBall: Number,
  implementationYear: Number // Optional: in case you want to track rule changes
});

const WinningMegaMillions = mongoose.model('WinningMegaMillions', megaMillionsSchema);

// ✅ export both models properly
const WinningPick2 = mongoose.model('WinningPick2', winningNumberPick2Schema);
const WinningPick3 = mongoose.model('WinningPick3', winningNumberPick3Schema);

module.exports = {
  WinningPick2,
  WinningPick3,
  WinningMegaMillions
};
