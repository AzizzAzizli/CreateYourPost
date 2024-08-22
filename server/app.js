require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const cors = require("cors");
const Users = require("./models/users");
const Posts = require("./models/Posts");

require("./DB/connection");
const {authenticateToken} = require("./middleware/authMiddlewate")
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//User Register
app.post("/api/users/register/", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill the all required fields!", status: 400 });
    } else {
      const isAlreadyRegistered = await Users.findOne({ email });
      if (isAlreadyRegistered) {
        return res
          .status(400)
          .json({ message: "User already exists!", status: 400 });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const User = new Users({
          fullname: fullname,
          email: email,
          password: hashedPassword,
        });
        User.save();
        return res
          .status(201)
          .json({ message: "User registered successfully!", status: 201 });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});

//User Login
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill the all required fields!", status: 400 });
    } else {
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "User not found!",
          status: 400,
        });
      } else {
        const validateUser = await bcrypt.compare(password, user.password);
        if (!validateUser) {
          return res
            .status(400)
            .json({ message: "User  password is incorrect!", status: 400 });
        } else {
          const payload = {
            userId: user._id,
            email: user.email,
          };
          const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "72h",
          });
          return res.status(200).json({
            message: "Logged in successfully!",
            status: 200,
            token,
            data: {
              userId: user._id,
              email: user.email,
              fullname: user.fullname,
            },
          });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});

//Create a new post
app.post("/api/posts/", authenticateToken, async (req, res) => {
  try {
    const { title, description, content, userId } = req.body;
    if (!title || !description || !content) {
      return res
        .status(400)
        .json({ message: "Please fill the all required fields!", status: 400 });
    } else {
      const post = new Posts({ title, description, content, userId });
      await post.save();
      return res
        .status(201)
        .json({ message: "Post saved successfully!", status: 201, data: post });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});

//Get all posts
app.get("/api/posts/", async (req, res) => {
  try {
    const allPosts = await Posts.find({ isDeleted: false }).sort({
      createdAt: -1,
    });

    let responseData = allPosts.map((post) => ({
      _id: post._id,
      title: post.title,
      description: post.description,
      userId: post.userId,
      views: post.views,
    }));

    return res
      .status(200)
      .json({ message: "All posts", status: 200, data: responseData });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});

//Get user posts
app.get("/api/posts/userId=:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const userPosts = await Posts.find({
      userId: userId,
      isDeleted: false,
    }).sort({
      createdAt: -1,
    });

    let responseData = userPosts.map((post) => ({
      _id: post._id,
      title: post.title,
      description: post.description,
      userId: post.userId,
      views: post.views,
    }));

    return res
      .status(200)
      .json({ message: "Your posts", status: 200, data: responseData });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});

//Post detail
app.get("/api/posts/postId=:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    const currentPost = await Posts.find({ _id: postId });

    return res
      .status(200)
      .json({ message: "Current post", status: 200, data: currentPost });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});

//Update the views of the post
app.get("/api/post/views/postId=:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Posts.findByIdAndUpdate(
      postId,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found", status: 404 });
    }

    res
      .status(200)
      .json({ message: "Views updated successfully", status: 200, post });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});

//Delete the post
app.put("/api/post/delete/postId=:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    const updatedPost = await Posts.findByIdAndUpdate(
      postId,
      { isDeleted: true },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found", status: 404 });
    }

    return res
      .status(200)
      .json({ message: "Post marked as deleted", status: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});

//Update the post
app.put("/api/post/update/postId=:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, description, content } = req.body;

    const updatedPost = await Posts.findByIdAndUpdate(
      postId,
      {
        title,
        description,
        content,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found", status: 404 });
    }

    return res.status(200).json({
      message: "Post updated successfully",
      status: 200,
      data: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: 500 });
  }
});

app.listen(PORT, () => {
  console.log("Server is running", PORT);
});
