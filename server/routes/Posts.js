const express = require("express");
const router = express.Router();
const { Post } = require("../models");

router.get("/", async (req, res) => {
  try {
    const listofPosts = await Post.findAll();
    res.json(listofPosts);
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
