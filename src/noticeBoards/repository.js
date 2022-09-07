const db = require("../bin/index");
const noticeBoard = db.noticeBoards;
const { sequelize } = require("../bin/index");
const { makePasswordHashed } = require("./modules/hashPassword");

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
      order: [["updatedAt", order]],
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
    return await noticeBoard.findOne({ where: { id: id } });
  },
  /**
   * 함수 설명
   * @param {{
   *    title: string,
   *    content: string,
   *    password: string
   *    salt: string}} object - 게시글 데이터베이스에 필요한 정보
   */
  post: async (noticeBoardData) => {
    const { title, content, password, salt } = noticeBoardData;
    return await noticeBoard.create({
      title,
      content,
      password,
      salt,
    });
  },
  /**
   * 함수 설명
   * @param {number} id - 게시글 아이디
   * @param {{
   * title: string,
   * content: string,
   * password: string}} object - 게시글을 수정할 정보
   */
  patch: async (noticeBoardId, noticeBoardData) => {
    const { title, content, password } = noticeBoardData;
    const newNoticeBoardId = Number(noticeBoardId);

    return await sequelize.transaction(async (transaction) => {
      const newNoticeBoard = await noticeBoard.findByPk(newNoticeBoardId, {
        raw: true,
        transaction,
      });
      const newNoticeBoardPassword = newNoticeBoard.password;
      const newNoticeBoardSalt = newNoticeBoard.salt;

      if (newNoticeBoardPassword !== makePasswordHashed(password, newNoticeBoardSalt)) {
        throw new Error();
      }

      await noticeBoard.update(
        {
          title: title,
          content: content,
        },
        {
          where: { id: newNoticeBoardId },
          raw: true,
          transaction,
        }
      );
    });
  },
  /**
   * 함수 설명
   * @param {number} id - 게시글 아이디
   * @param {number} password - 게시글 비밀번호
   * @returns 레포지토리 반환
   */
  delete: async (noticeBoardId, password) => {
    const newNoticeBoardId = noticeBoardId;
    return await sequelize
      .transaction(async (transaction) => {
        const newNoticeBoard = await noticeBoard.findByPk(newNoticeBoardId, {
          raw: true,
          transaction,
        });
        const newNoticeBoardPassword = newNoticeBoard.password;
        const newNoticeBoardSalt = newNoticeBoard.salt;

        if (newNoticeBoardPassword !== makePasswordHashed(password, newNoticeBoardSalt)) {
          throw new Error();
        }

        await noticeBoard.destroy({
          where: { id: noticeBoardId },
          raw: true,
          transaction,
        });
      })
      .catch((err) => {
        throw err;
      });
  },
};
