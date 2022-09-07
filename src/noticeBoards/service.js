const repository = require("./repository");

module.exports = {
  /**
   * 함수 설명
   * @param {{order:string, page:number, limit: number}} object 무한 스크롤 변수 모음
   * @returns 전체 게시글 레포지토리 반환
   */
  getAll: async (infiniteScrollingData) => {
    return await repository.getAll(infiniteScrollingData);
  },
  /**
   * 함수 설명
   * @param {number} id - 게시글 아이디
   * @returns 특정 게시글 레포지토리 반환
   */
  getOne: async (id) => {
    return await repository.getOne(id);
  },
};
