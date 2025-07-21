const router = require("express").Router();
const z = require("zod");
const validate = require("../middlewares/validation.middleware");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.middleware");

const saltRounds = 12;

const registerDto = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.email("Invalid email").nonempty("Email is required"),
  password: z.string().min(4, "Password must be at least 4 charcters"),
  confirmPassword: z.string().min(4, "Password must be at least 4 charcters"),
});

router.post("/auth/register", validate(registerDto), async (req, res) => {
  try {
    const { confirmPassword, ...userData } = req.validated;

    if (userData.password !== confirmPassword) {
      res
        .status(400)
        .json({ error: "password and confirmPassword do not match!" });
    }

    userData.password = await bcrypt.hash(userData.password, saltRounds);

    await User.create(userData);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    if (err.code === "P2002") {
      res.status(409).json({ error: "Email already in use" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

const loginDto = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});

function signJwtAsync(payload, secret, options = {}) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
}

router.post("/auth/login", validate(loginDto), async (req, res) => {
  try {
    const { email, password } = req.validated;
    const user = await User.findByEmail(email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const payload = { sub: user.id, email: user.email };
      const accessToken = await signJwtAsync(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      res.status(200).json({ accessToken });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/me", auth, async (req, res) => {
  const userData = await User.findById(req.user.sub);
  const { password, ...user } = userData;
  res.status(200).json(user);
});

module.exports = router;
