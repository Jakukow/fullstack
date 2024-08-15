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

router.get("/byUserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await await Post.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  try {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Post.create(post);
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});

router.put("/title", validateToken, async (req, res) => {
  try {
    const { newTitle, id } = req.body;
    await Post.update({ title: newTitle }, { where: { id: id } });

    res.json(newTitle);
  } catch (error) {
    console.log(error);
  }
});

router.put("/postText", validateToken, async (req, res) => {
  try {
    const { newText, id } = req.body;
    await Post.update({ postText: newText }, { where: { id: id } });

    res.json(newTitle);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  try {
    await Post.destroy({
      where: {
        id: postId,
      },
    });
    res.json("post deleted");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
