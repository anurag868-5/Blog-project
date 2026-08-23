require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Blog = require("./models/Blogs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Blog API is running successfully");
});
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

  app.post("/api/blogs", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({
        message: "Title, content and author are required",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      author,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create blog",
    });
  }
});
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);

    res.status(500).json({
      message: "Failed to fetch blogs",
    });
  }
});
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const hashedPassword = password; // temporary

    const user = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword
    };

    console.log("User registered:", user);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed"
    });
  }
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});