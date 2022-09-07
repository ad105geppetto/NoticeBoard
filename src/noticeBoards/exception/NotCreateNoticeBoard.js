const { StatusCodes } = require("http-status-codes");

class NotCreateNoticeBoard extends Error {
  constructor() {
    super();
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.message = "게시글의 제목은 최대 20 자이며 본문은 200 자여야 합니다.";
  }
}

module.exports = NotCreateNoticeBoard;
