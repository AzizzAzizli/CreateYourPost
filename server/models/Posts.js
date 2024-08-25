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
    author: {
      type:String,
      required:true
    },
    isDeleted: {
      default: false,
      type: Boolean,
    },
    likes: {
      type: Array,
      default:[],
    },
    likenum: {
      type: Number,
      default:0,
    }
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.model("Post", postsSchema);
module.exports = Posts;
