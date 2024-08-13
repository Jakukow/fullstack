const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");
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
  if (!user) console.error("User not found");
  else {
    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) console.error("Wrong username or Password");
      const accessToken = sign(
        { username: user.username, id: user.id },
        "secret"
      );
      res.json({ token: accessToken, username: username.id, id: user.id });
    } catch (error) {
      console.log("error");
    }
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;
  const basicInfo = await Users.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });
  res.json(basicInfo);
});

module.exports = router;
