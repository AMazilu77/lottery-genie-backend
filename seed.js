require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { WinningPick2, WinningPick3, WinningMegaMillions } = require('./models/winningNumbersModel');

// Read pick 3 data safely inside this file, not inside the module
const pick3Path = path.resolve(__dirname, 'bin/scripts/seeds/pick3_seed_data.json');
const flPick3Seed = JSON.parse(fs.readFileSync(pick3Path, 'utf8'));

// Load the Mega Millions seed
const megaMillionsPath = path.resolve(__dirname, 'bin/scripts/seeds/megaMillions_seed_data.json');
const megaMillionsSeed = JSON.parse(fs.readFileSync(megaMillionsPath, 'utf8'));

// Pick 2 data inline
const flPick2Seed = [
  {
    drawDate: '2025-05-08', winningNumber: '44', fireball: '3', midDay: false, evening: true,
  },
  {
    drawDate: '2025-04-12', winningNumber: '44', fireball: '6', midDay: true, evening: false,
  },
  {
    drawDate: '2025-04-11', winningNumber: '75', fireball: '1', midDay: false, evening: true,
  },
  {
    drawDate: '2025-05-07', winningNumber: '52', fireball: '2', midDay: false, evening: true,
  },
  {
    drawDate: '2025-04-11', winningNumber: '84', fireball: '1', midDay: true, evening: false,
  }
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to Railway MongoDB');

    await WinningPick2.deleteMany({});
    await WinningPick3.deleteMany({});
    console.log('🧼 Cleared Pick 2 & Pick 3 collections');

    const inserted2 = await WinningPick2.insertMany(flPick2Seed);
    console.log(`🌱 Pick 2 seeded! ${inserted2.length} records`);

    const inserted3 = await WinningPick3.insertMany(flPick3Seed);
    console.log(`🌱 Pick 3 seeded! ${inserted3.length} records`);

    // seed mega millions
    await WinningMegaMillions.deleteMany({});
    console.log('🧼 Cleared Mega Millions collection');

    const insertedMega = await WinningMegaMillions.insertMany(megaMillionsSeed);
    console.log(`🌱 Mega Millions seeded! ${insertedMega.length} records`);

    await mongoose.disconnect();
    console.log('🧞 Djinn disconnected. Seeding complete.');

  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
})();
