const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    commentArray: {
      type: Array,
      required: true
    },
    bookmark: {
      type: Array,
    }
    // name: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
