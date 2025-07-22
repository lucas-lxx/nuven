const express = require("express");
const authRouter = require("./routes/auth.routes");
const dataSetsRouter = require("./routes/dataset.routes");

const app = express();

app.use(express.json());
app.use("/", authRouter);
app.use("/", dataSetsRouter);
app.use("/", (req, res, next) => {
  res.json({ message: "hit the get all route" });
});

app.listen(process.env.PORT ?? 3000, () => {
  console.log(
    `Server listening at http://localhost:${process.env.PORT ?? 3000}`
  );
});
