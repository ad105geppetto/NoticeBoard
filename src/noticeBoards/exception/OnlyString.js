const { StatusCodes } = require("http-status-codes");

class OnlyString extends Error {
  constructor() {
    super();
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.message = "비밀번호는 6 자 이상이어야 하고, 숫자 1 개 이상 반드시 포함 되어야 합니다";
  }
}

module.exports = OnlyString;
