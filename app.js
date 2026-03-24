require("dotenv").config();
const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blogs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const checkForAuthenticationCookie = require("./middleware/authentication");
const Blog = require("./models/blogs");

const app = express();
const PORT = process.env.PORT || 5000; // for AWS

mongoose
  .connect(process.env.MONGO_URI) // for production
  .then((e) => console.log("MongoDB  Atlas is connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
