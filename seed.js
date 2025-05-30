require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const {
  WinningPick2,
  WinningPick3,
  WinningPick4,
  WinningPick5,
  WinningFL_Lotto,
  Winning_Jackpot,
  WinningCashForLife,
  WinningMegaMillions,
  WinningPowerball,
  WinningFL_Fantasy5
} = require('./models/winningNumbersModel');

// ----- Seed Files -----
const pick2Path = path.resolve(__dirname, 'bin/scripts/seeds/pick2-2025-reparsed.json');
const flPick2Seed = JSON.parse(fs.readFileSync(pick2Path, 'utf8'));

const pick3Path = path.resolve(__dirname, 'bin/scripts/seeds/pick3_seed_data.json');
const flPick3Seed = JSON.parse(fs.readFileSync(pick3Path, 'utf8'));

const pick4Path = path.resolve(__dirname, 'bin/scripts/seeds/pick4-2025-full.json');
const flPick4Seed = JSON.parse(fs.readFileSync(pick4Path, 'utf8'));

const pick5Path = path.resolve(__dirname, 'bin/scripts/seeds/pick5-2025-full.json');
const flPick5Seed = JSON.parse(fs.readFileSync(pick5Path, 'utf8'));

const FL_Lotto_path = path.resolve(__dirname, 'bin/scripts/seeds/florida-lotto-seed.json');
const FL_Lotto_seed = JSON.parse(fs.readFileSync(FL_Lotto_path, 'utf8'));

const Fantasy5_Path = path.resolve(__dirname, 'bin/scripts/seeds/fantasy5-seed.json');
const Fantasy5_Seed = JSON.parse(fs.readFileSync(Fantasy5_Path, 'utf8'));

const Jackpot_Path = path.resolve(__dirname, 'bin/scripts/seeds/jackpot-triple-play-corrected.json');
const Jackpot_Seed = JSON.parse(fs.readFileSync(Jackpot_Path, 'utf8'));

const Cash_For_Life_Path = path.resolve(__dirname, 'bin/scripts/seeds/cash4life-seed.json');
const Cash_For_Life_Seed = JSON.parse(fs.readFileSync(Cash_For_Life_Path, 'utf8'));

const megaMillionsPath = path.resolve(__dirname, 'bin/scripts/seeds/megaMillions_seed_data.json');
const megaMillionsSeed = JSON.parse(fs.readFileSync(megaMillionsPath, 'utf8'));

const powerballPath = path.resolve(__dirname, 'bin/scripts/seeds/powerball-2025-final-repaired.json');
const powerballSeedData = JSON.parse(fs.readFileSync(powerballPath, 'utf8'));



// ----- Seeding Routine -----
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to Railway MongoDB');

    // Clear and seed Pick 2 & 3
    await WinningPick2.deleteMany({});
    await WinningPick3.deleteMany({});
    await WinningPick4.deleteMany({});
    await WinningPick5.deleteMany({});
    await WinningFL_Lotto.deleteMany({});
    await WinningFL_Fantasy5.deleteMany({});
    await Winning_Jackpot.deleteMany({});
    await WinningCashForLife.deleteMany({});
    await WinningMegaMillions.deleteMany({});
    await WinningPowerball.deleteMany({});


    const inserted2 = await WinningPick2.insertMany(flPick2Seed);
    console.log(`🌱 Pick 2 winning numbers seeded! ${inserted2.length} records`);

    const inserted3 = await WinningPick3.insertMany(flPick3Seed);
    console.log(`🌱 Pick 3 winning numbers seeded! ${inserted3.length} records`);

    const inserted4 = await WinningPick4.insertMany(flPick4Seed);
    console.log(`🌱 Pick 4 winning numbers seeded! ${inserted4.length} records`);

    const inserted5 = await WinningPick5.insertMany(flPick5Seed);
    console.log(`🌱 Pick 5 winning numbers seeded! ${inserted5.length} records`);

    const inserted_FL_Lotto = await WinningFL_Lotto.insertMany(FL_Lotto_seed);
    console.log(`🌱 FL Lotto winning numbers seeded! ${inserted_FL_Lotto.length} records`);

    const inserted_Fantasy5 = await WinningFL_Fantasy5.insertMany(Fantasy5_Seed);
    console.log(`🌱 FL Fantasy 5 winning numbers seeded! ${inserted_Fantasy5.length} records`);

    const inserted_jackpot = await Winning_Jackpot.insertMany(Jackpot_Seed);
    console.log(`🌱 FL Jackpot winning numbers seeded! ${inserted_jackpot.length} records`);

    const inserted_cash_for_life = await WinningCashForLife.insertMany(Cash_For_Life_Seed);
    console.log(`🌱 Cash For life winning numbers seeded! ${inserted_cash_for_life.length} records`);

    const insertedMega = await WinningMegaMillions.insertMany(megaMillionsSeed);
    console.log(`🌱 Mega Millions winning numbers seeded! ${insertedMega.length} records`);

    const insertedPowerball = await WinningPowerball.insertMany(powerballSeedData);
    console.log(`🌱 Powerball winning numbers seeded! ${insertedPowerball.length} records`);

    await mongoose.disconnect();
    console.log('🧞 Djinn disconnected. Seeding complete.');

  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
})();
