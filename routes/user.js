const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("signin");
});

router.post("/signup", async (req, res) => {
  const { fullName, username, email, password } = req.body;
  await User.create({
    fullName,
    username,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (e) {
    return res.render("signin", {
      error: "Invalid Email or Password",
    });
  }
});
module.exports = router;
