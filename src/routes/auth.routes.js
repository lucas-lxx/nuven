const router = require("express").Router();
const z = require("zod");
const validate = require("../middlewares/vidation.middleware");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const saltRounds = 12;

const registerDto = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.email("Invalid email").nonempty("Email is required"),
  password: z.string().min(4, "Password must be at least 4 charcters"),
});

router.post("/register", validate(registerDto), async (req, res, next) => {
  const user = req.validated;

  user.password = await bcrypt.hash(user.password, saltRounds);

  User.create(user);
  res.status(201).json(user);
});

module.exports = router;
