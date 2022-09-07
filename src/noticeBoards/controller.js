const service = require("./service");
const { StatusCodes } = require("http-status-codes");

module.exports = {
  getAll: async (req, res) => {
    try {
      const infiniteScrollingData = {
        order: req.query.order,
        page: Number(req.query.page),
        limit: Number(req.query.limit),
      };
      const data = await service.getAll(infiniteScrollingData);

      return res.status(StatusCodes.OK).json({ data, message: "OK" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "INTERNAL SERVER ERROR" });
    }
  },
  getOne: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await service.getOne(id);
      return res.status(StatusCodes.OK).json({ result, message: "OK" });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "INTERNAL SERVER ERROR" });
    }
  },
  post: async (req, res) => {
    try {
      const noticeBoardData = req.body;
      await service.post(noticeBoardData);
      return res.status(StatusCodes.CREATED).json({ message: "OK" });
    } catch (error) {
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message } || { message: "INTERNAL SERVER ERROR" });
    }
  },
  patch: async (req, res) => {
    try {
      const noticeBoardId = Number(req.params.id);
      const noticeBoardData = {
        title: req.body.title,
        content: req.body.content,
        password: req.body.password,
      };
      await service.patch(noticeBoardId, noticeBoardData);
      return res.status(StatusCodes.OK).json({ message: "OK" });
    } catch (error) {
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message } || { message: "INTERNAL SERVER ERROR" });
    }
  },
  delete: async (req, res) => {
    try {
      const noticeBoardId = Number(req.params.id);
      const password = req.headers.authorization;
      await service.delete(noticeBoardId, password);
      return res.status(StatusCodes.NO_CONTENT).end();
    } catch (error) {
      return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message } || { message: "INTERNAL SERVER ERROR" });
    }
  },
};
