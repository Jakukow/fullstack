const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { where } = require("sequelize");
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
  if (!user) res.json({ error: "Wrong username or password" });
  else {
    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) res.json({ error: "Wrong username or password" });
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

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  try {
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) res.json({ error: "Password doesn't match" });
    const hash = await bcrypt.hash(newPassword, 10);
    Users.update(
      { password: hash },
      { where: { username: req.user.username } }
    );
    res.json("Success");
  } catch (error) {
    console.log("error");
  }
});

module.exports = router;
