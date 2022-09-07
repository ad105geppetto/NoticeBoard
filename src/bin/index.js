const dbConfig = require("./db.config.js");

const Sequelize = require("sequelize");
const initModels = require("./init-models.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: false,
});

const db = initModels(sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;
