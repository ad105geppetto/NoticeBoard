const express = require("express");
const app = express();
const port = 3000;
const noticeBoardsRouter = require("./noticeBoards/router");

app.use("/api", noticeBoardsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
