require("dotenv").config();
const express = require("express");
const db = require("./bin/index");
const app = express();
const port = 3000;
const noticeBoardsRouter = require("./noticeBoards/router");

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.use("/api", noticeBoardsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
