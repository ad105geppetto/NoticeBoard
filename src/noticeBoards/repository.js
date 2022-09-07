const db = require("../bin/index");
const noticeBoard = db.noticeBoard;

module.exports = {
  /**
   * 함수 설명
   * @returns 전체 공지사항 게시글 레포지토리 반환
   */
  getAll: async () => {
    return await noticeBoard.findAll();
  },
};
