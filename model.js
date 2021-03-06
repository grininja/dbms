const { Sequelize, DataTypes } = require("sequelize");
const Usermode = require("./models/User");
const Storymode = require("./models/Stories");
const TodoModel = require("./models/todo");
const TranscationsModel = require("./models/transcations");
const Admin=require("./models/Admin");
// const BudgetModel = require("./models/budget");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/config/config.json")[env];

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const models = {
  User: Usermode(sequelize, DataTypes),
  Stories: Storymode(sequelize, DataTypes),
  Todo: TodoModel(sequelize, DataTypes),
  Transcations: TranscationsModel(sequelize, DataTypes),
  Admin:Admin(sequelize,DataTypes)
};

module.exports = models;
