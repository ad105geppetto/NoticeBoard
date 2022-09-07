const repository = require("./repository");
const { hashPassword } = require("./modules/hashPassword");
const NotCreateNoticeBoard = require("./exception/NotCreateNoticeBoard");

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
  /**
   * 함수 설명
   * @param {{
   *    title: string,
   *    content: string,
   *    password: string}} object - 게시글에 필요한 정보
   * @returns 레포지토리 반환
   */
  post: async (noticeBoardData) => {
    if (noticeBoardData.title.length > 20 || noticeBoardData.content.length > 200) {
      throw new NotCreateNoticeBoard();
    }

    const hashInfo = hashPassword(noticeBoardData.password);

    noticeBoardData.password = hashInfo.hash;
    noticeBoardData.salt = hashInfo.salt;

    return await repository.post(noticeBoardData);
  },
  /**
   * 함수 설명
   * @param {number} id - 게시글 아이디
   * @param {{
   *    title: string,
   *    content: string,
   *    password: string}} object - 게시글을 수정할 정보
   * @returns 레포지토리 반환
   */
  patch: async (noticeBoardId, noticeBoardData) => {
    if (noticeBoardData.title.length > 20 || noticeBoardData.content.length > 200) {
      throw new NotCreateNoticeBoard();
    }

    return await repository.patch(noticeBoardId, noticeBoardData);
  },
  /**
   * 함수 설명
   * @param {number} id - 게시글 아이디
   * @param {number} password - 게시글 비밀번호
   * @returns 레포지토리 반환
   */
  delete: async (noticeBoardId, password) => {
    return await repository.delete(noticeBoardId, password);
  },
};
