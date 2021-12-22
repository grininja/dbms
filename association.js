const { Sequelize, Model, Op } = require("sequelize");
const models = require("./model");
const { User, Stories, Task, Groups, Todo, TodoItem } = models;

const setassociation = () => {
  User.hasMany(Stories, { foreignKey: "author", targetKey: "author" });
  User.hasMany(Task, { foreignKey: "creator", targetKey: "creator" });
  User.hasMany(Todo, { foreignKey: "creator", targetKey: "creator" });
  Todo.hasMany(TodoItem, { foreignKey: "todoId", targetKey: "todoId" });
  // Stories.hasOne(User);
  // Task.hasOne(User);
  Todo.belongsTo(User, {
    as: "user",
    foreignKey: "username",
  });
  Todo.hasMany(TodoItem, {
    as: "todoItems",
    foreignKey: "todoId",
  });
};

module.exports = setassociation;
