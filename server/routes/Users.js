const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await Users.create({
      username: username,
      password: hash,
    });
    res.json("Succes");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) throw Error("No user found");
  else {
    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw Error("Wrong username And Password");
      res.json("logged in!");
    } catch (error) {
      console.log("error");
    }
  }
});

module.exports = router;
