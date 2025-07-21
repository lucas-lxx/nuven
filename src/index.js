require("dotenv").config();
const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  res.json({ message: "work" });
});

app.listen(process.env.PORT ?? 3000);
