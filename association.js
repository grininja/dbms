const { Sequelize, Model, Op } = require("sequelize");
// const { Admin } = require("./model");
const models = require("./model");
const { User, Stories, Todo, Transcations, Admin } = models;

const setassociation = () => {
  User.hasMany(Stories, { foreignKey: "author", targetKey: "author" });
  // User.hasMany(Task, { foreignKey: "creator", targetKey: "creator" });
  User.hasMany(Todo, {
    foreignKey: "creator",
    targetKey: "creator",
    onDelete: "cascade",
  });
  // Todo.hasMany(TodoItem, {
  //   foreignKey: "todoId",
  //   targetKey: "todoId",
  //   onDelete: "cascade",
  // });
  User.hasMany(Transcations, {
    foreignKey: "creator",
    targetKey: "creator",
    onDelete: "cascade",
  });
  Todo.belongsTo(User, {
    as: "user",
    foreignKey: "creator",
  });
  // Todo.hasMany(TodoItem, {
  //   as: "todoItems",
  //   foreignKey: "todoId",
  // });
  Transcations.belongsTo(User, {
    as: "user",
    foreignKey: "creator",
  });
  Admin.belongsTo(User, { as: "user", foreignKey: "username" });
};

module.exports = setassociation;
