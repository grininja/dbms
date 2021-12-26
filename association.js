const { Sequelize, Model, Op } = require("sequelize");
const models = require("./model");
const { User, Stories, Task, Groups, Todo, TodoItem, Transcations } = models;

const setassociation = () => {
  User.hasMany(Stories, { foreignKey: "author", targetKey: "author" });
  User.hasMany(Task, { foreignKey: "creator", targetKey: "creator" });
  User.hasMany(Todo, { foreignKey: "creator", targetKey: "creator" });
  Todo.hasMany(TodoItem, { foreignKey: "todoId", targetKey: "todoId" });
  User.hasMany(Transcations, { foreignKey: "creator", targetKey: "creator" });

  Todo.belongsTo(User, {
    as: "user",
    foreignKey: "creator",
  });
  Todo.hasMany(TodoItem, {
    as: "todoItems",
    foreignKey: "todoId",
  });
  Transcations.belongsTo(User, {
    as: "user",
    foreignKey: "creator",
  })
};

module.exports = setassociation;
