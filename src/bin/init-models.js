var DataTypes = require("sequelize").DataTypes;
var noticeBoardsModel = require("../noticeBoards/model");

function initModels(sequelize) {
  var noticeBoards = noticeBoardsModel(sequelize, DataTypes);

  return {
    noticeBoards,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
