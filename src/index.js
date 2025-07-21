const express = require("express");
const authRouter = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/", (req, res, next) => {
  res.json({ message: "work" });
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log(
    `Server listening at http://localhost:${process.env.PORT ?? 3000}`
  );
});
