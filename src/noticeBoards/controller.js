const service = require("./service");
const { StatusCodes } = require("http-status-codes");

module.exports = {
  getAll: async (req, res) => {
    try {
      const infiniteScrollingData = req;
      const result = await service.getAll(infiniteScrollingData);
      return res.status(StatusCodes.OK).json({ result, message: "OK" });
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
};
