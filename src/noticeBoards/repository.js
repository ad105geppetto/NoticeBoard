const db = require("../bin/index");
const noticeBoard = db.noticeBoards;

module.exports = {
  /**
   * 함수 설명
   * @param {{order:string, page:number, limit: number}} object 무한 스크롤 변수 모음
   * @returns 전체 게시글 레포지토리 반환
   */
  getAll: async (infiniteScrollingData) => {
    const { order, page, limit } = infiniteScrollingData;
    let offset = 0;

    if (page > 1) {
      offset = limit * (page - 1);
    }

    return await noticeBoard.findAll({
      order: [["updated_at", order]],
      offset: offset,
      limit: limit,
    });
  },
  /**
   * 함수 설명
   * @param {number} id - 특정 게시글 아이디
   * @returns 특정 게시글 레포지토리 반환
   */
  getOne: async (id) => {
    return await post.findOne({ where: { id: id } });
  },
};
