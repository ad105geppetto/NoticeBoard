module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "noticeBoards",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      salt: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      charset: "utf8mb4",
    }
  );
};
