const express = require("express");
const mongoDB = require("./db/MongoDB");
const usersRouter = require("./routes/userRouter");
const commentRouter = require("./routes/commentRouter");
const orderRouter = require("./routes/orderRouter");
const productRouter = require("./routes/productRouter");
const realRouter = require("./routes/realRouter");

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/comments", commentRouter);
app.use("/orders", orderRouter);
app.use("/products", productRouter);
app.use("/real", realRouter);

const server = app.listen(3001, async (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log("server is running");
  const db = await mongoDB.connect();
  app.locals.db = db;
  console.log("db connected");
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
