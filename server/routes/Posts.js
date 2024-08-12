const express = require("express");
const router = express.Router();
const { Post, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  try {
    const listOfPosts = await Post.findAll({ include: [Likes] });
    const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
    res.json({ listOfPosts, likedPosts });
  } catch (error) {
    console.log(error);
  }
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await await Post.findByPk(id);
  res.json(post);
});

router.post("/", async (req, res) => {
  try {
    const post = req.body;

    await Post.create(post);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
