const express = require("express");
const { Types } = require("mongoose");
const router = express.Router();
const Comment = require("../Models/Comment");
const Blog = require("../Models/Blog");


router.post("/createCommnet", async (req, res) => {

  const comment = await new Comment({
    commentArray: req.body.commentArray,
    bookmark: req.body.bookmark,
  }).save();
  if (!comment)
    return res.status(400).json({ status: "Success", message: "the comment cannot be created!" });
  return res.status(200).json({ status: "Success", data: comment });
});

router.get("/getComments", async (req, res) => {
  const getallcomments = await Comment.find().sort({ _id: -1 });
  if (!getallcomments)
    return res.status(400).send("the getallcomments is not found");
  res.status(200).json({ data: getallcomments });
});

router.post("/getsingle", async (req, res) => {
  // console.log(req.body);

  const getsignleblog = await Blog.findOne({ _id: req.body.postId });
  if (!getsignleblog)
    return res.status(400).json({
      message: "The User with the given ID was not found.",
    });
  res.status(200).json({ data: getsignleblog });
});

module.exports = router;
