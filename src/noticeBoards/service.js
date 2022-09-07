const repository = require("./repository");

module.exports = {
  /**
   * 함수 설명
   * @returns 전체 게시글 레포지토리 반환
   */
  getAll: async () => {
    return await repository.getAll();
  },
};
