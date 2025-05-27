const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


exports.createUser = async (req, res, next) => {
  console.log("Signup attempt with:", req.body);

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


exports.loginUser = (req, res, next) => {
  console.log("Login attempt with:", req.body);

  let fetchedUser;

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) throw new Error("USER_NOT_FOUND");

      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) throw new Error("PASSWORD_MISMATCH");

      if (!process.env.JWT_KEY) {
        console.error("🚨 JWT_KEY is undefined in production!");
        throw new Error("JWT_MISSING");
      }
      
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      console.log("JWT_KEY is:", process.env.JWT_KEY);

      console.log("✅ Token created:", token);

      return res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      console.error("Login error:", err.message);

      let msg = "Internal server error during login.";
      if (err.message === "USER_NOT_FOUND") msg = "User not found.";
      else if (err.message === "PASSWORD_MISMATCH") msg = "Password mismatch.";
      else if (err.message === "JWT_MISSING") msg = "JWT_KEY not defined in env vars.";

      if (!res.headersSent) {
        res.status(401).json({ message: msg });
      }
    });
};


