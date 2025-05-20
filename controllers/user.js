const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


exports.createUser = async (req, res, next) => {
  console.log("🧪 Signup attempt with:", req.body);

  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      email: req.body.email,
      password: hash
    });

    const result = await user.save();
    console.log("✅ User saved:", result.email);

    res.status(201).json({
      message: 'User created',
      result: result
    });
  } catch (err) {
    console.error("❌ Registration failed:", err);

    if (!res.headersSent) {
      res.status(500).json({
        message: err.message || 'Signup failed'
      });
    }
  }
};





//* user registration logic control */
// exports.createUser = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10).then(hash => {
//         const user = new User({
//             email: req.body.email,
//             password: hash
//             // use bcrypt npm package to encrypt pw data securely
//             // password: req.body.password  ( <--do not ever store passwords like this!)
//         });
//         // save user to DB
//         user.save()
//         .then(result => {
//             res.status(201).json({
//                 message: 'User created',
//                 result: result
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                     message: ' Invalid Authentication Credentials.'
                
//             });
//         });
//     });
// }


exports.loginUser = (req, res, next) => {
  console.log("Login attempt with:", req.body);

  let fetchedUser;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        console.log("No user found for email:", req.body.email);
        // Throwing an error forces the chain into `.catch()`
        throw new Error("USER_NOT_FOUND");
      }

      fetchedUser = user;
      console.log("User found:", fetchedUser.email);
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        console.log("Password mismatch for user:", fetchedUser.email);
        throw new Error("PASSWORD_MISMATCH");
      }

      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      console.log("Token created for", fetchedUser.email);

      return res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      console.error("Login error caught:", err.message);
      if (!res.headersSent) {
        const msg =
          err.message === "USER_NOT_FOUND"
            ? "Authentication failed: Djinn does not recognize you"
            : err.message === "PASSWORD_MISMATCH"
            ? "Auth Failed: Incorrect password"
            : "Internal server error during login.";

        res.status(401).json({ message: msg });
      }
    });
};


//* user login control */
// exports.loginUser = (req, res, next) => {
//     let fetchedUser;
//     User.findOne({ email: req.body.email }).then(user => {
//         if (!user) {
//             return res.status(401).json({
//                 message: 'Authentication failed, The Djinn Does not Recognize you'
//             });
//         }
//         fetchedUser = user;
//         return bcrypt.compare(req.body.password, user.password)
//     })
//     .then(result => {
//         if (!result) {
//             return res.status(401).json({
//                 message: 'Auth Failed'
//             });
//         }

//         // sign method creates a new token based on input data of choice
//         const token = jwt.sign({
//             email: fetchedUser.email,
//             userId: fetchedUser._id
 
//             // PW used to create hash, stored on server and used to validate hash, this is what makes jWTs uncrackable
//         },
//          process.env.JWT_KEY,
//           { expiresIn: "1h"} 
//         );
//         res.status(200).json({
//             token: token,
//             expiresIn: 3600,
//             // user Id passed to front end on login
//             userId: fetchedUser._id
            
//         })
//         console.log("JWT_KEY in loginUser:", process.env.JWT_KEY);

//     })
//     .catch(err => {
//         return res.status(401).json({
//             message: "Invalid authentication credentials."
//         });
//     });
// }