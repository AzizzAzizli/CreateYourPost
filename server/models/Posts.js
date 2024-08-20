const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    views: {
      default: 0,
      type: Number,
    },
    isDeleted: {
      default: false,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Post", postsSchema);
module.exports = Posts;
