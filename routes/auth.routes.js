const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  return res.json({ user:req.user});
});

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.status(500).json({ status: "Invalid credentials"})
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(500).json({ status: "Invalid credentials"})
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
    .then((user) => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ status: "Logged outs"})
});

module.exports = router;
