const service = require("./service");

module.exports = {
  /**
   * 함수 설명
   * @returns 전체 공지사항 게시글 레포지토리 반환
   */
  getAll: async (req, res) => {
    const result = await service.getAll();
    res.json({ result, message: "OK" });
  },
};
