const express = require('express')
// const LOCALDB = require('process.env.LOCALDB')
const router = express.Router();
const { WinningPick2,
   WinningPick3,
    WinningPick4,
     WinningPick5,
      WinningMegaMillions,
      WinningPowerball,
       WinningFL_Lotto,
        WinningCashForLife,
        WinningFL_Fantasy5,
        Winning_Jackpot
       } = require('../models/winningNumbersModel')
const assert = require('assert');
const url = "mongodb://localhost:3000/api/winning";
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
const dbName = 'winning-numbers';
const mongoose = require('mongoose');



   
    // route to POST winning pick 2 numbers!
    router.post('/FLPick2Winners', (req, res, next) => {
      const winningNumbers = new WinningPick2({
        _id: new mongoose.Types.ObjectId(),
        drawDate: req.body.drawDate,
        winningNumber: req.body.winningNumber,
        fireball: req.body.fireball,
        midDay: req.body.midDay,
        evening: req.body.evening
      });
      winningNumbers
      .save()
      // chain promise with then
      .then(result => {
        console.log(result);
      })
        .catch(err => console.log(err));

        res.status(201).json({
          message: "handling post",
          createdWinningNumber: winningNumbers
        });
      
    });
  

    // GET route to fetch all pick 2 winning numbers
    router.get('/FLPick2Winners', (req, res, next) => {
      WinningPick2.find()
      .exec()
      .then(documents => {
       console.log(documents);
       res.status(200).json(documents);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    })

    // route to POST winning pick 2 numbers!
    router.post('/FLPick3Winners', (req, res, next) => {
      const winningNumbers = new WinningPick3({
        _id: new mongoose.Types.ObjectId(),
        drawDate: req.body.drawDate,
        winningNumber: req.body.winningNumber,
        fireball: req.body.fireball,
        midDay: req.body.midDay,
        evening: req.body.evening
      });
      winningNumbers
      .save()
      // chain promise with then
      .then(result => {
        console.log(result);
      })
        .catch(err => console.log(err));

        res.status(201).json({
          message: "handling post",
          createdWinningNumber: winningNumbers
        });
      
    });
  

    // GET route to fetch all pick 2 winning numbers
    router.get('/FLPick3Winners', (req, res, next) => {
      WinningPick3.find()
      .exec()
      .then(documents => {
       console.log(documents);
       res.status(200).json(documents);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    })    

   
    // alias route for FLPick3
router.get('/FLPick3', (req, res, next) => {
  WinningPick3.find()
    .exec()
    .then(documents => {
      res.status(200).json(documents);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.get('/pick4', async (req, res) => {
  try {
    const results = await WinningPick4.find().sort({ drawDate: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Pick 4 results', error: err });
  }
});

router.get('/pick5', async (req, res) => {
  try {
    const results = await WinningPick5.find().sort({ drawDate: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Pick 5 results', error: err });
  }
});

router.get('/florida-lotto', async (req, res) => {
  try {
    const results = await WinningFL_Lotto.find().sort({ drawDate: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Winning Florida Lotto results', error: err });
  }
});

router.get('/fantasy5', async (req, res) => {
  try {
    const results = await WinningFL_Fantasy5.find().sort({ drawDate: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Winning Fantasy Lotto results', error: err });
  }
});

router.get('/jackpot', async (req, res) => {
  try {
    const results = await Winning_Jackpot.find().sort({ drawDate: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Winning Florida Jackpot Lotto results', error: err });
  }
});

router.get('/cash-for-life', async (req, res) => {
  try {
    const results = await WinningCashForLife.find().sort({ drawDate: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch Winning Cash For Life Lotto results', error: err });
  }
});



// This handles GET /api/winning/megamillions
router.get('/megamillions', async (req, res) => {
  try {
    const results = await WinningMegaMillions.find().sort({ drawDate: -1 });
    res.json(results);
  } catch (err) {
    console.error('❌ Error fetching Mega Millions:', err);
    res.status(500).send('Server error');
  }
});

// GET all Powerball results
router.get('/powerball', async (req, res) => {
  try {
    const results = await WinningPowerball.find().sort({ drawDate: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Powerball results.' });
  }
});

// GET latest Powerball result
router.get('/powerball/latest', async (req, res) => {
  try {
    const result = await WinningPowerball.findOne().sort({ drawDate: -1 });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch latest result.' });
  }
});

// router.get("/megaWin", (req, res, next) => {
//   WinModel.find()
//     .then(WinningMegaMillions => {
//       console.log("Mega win time!!!");
//       res.render("megaWin", {
//         WinningMegaMillions
//       });
//     })

//     .catch(error => {
//       console.log(error);
//     });
// });

// router.get("/megaWin", (req, res, next) => {
//   // res.json({
//   //   "winningNumber": "7"
//   // })
//   WinModel.find()
//   .then(WinningMegaMillions => {
//     const pick2Winners = [
//       {
//         drawDate: "2018-07- 20",
//         megaBall: "01",
//         multiplier: "02",
//         winningNumber: "01 14 30 44 62"
//       }
//     ]
//   })
// });



module.exports = router;
