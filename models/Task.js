const { Sequelize, DataTypes } = require("sequelize");
const Task = (Sequelize, DataTypes) => {
  return Sequelize.define("task", {
    taskID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    taskTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    taskDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    creationtime: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "users",
        key: "username",
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = Task;
