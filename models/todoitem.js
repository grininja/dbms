const { Sequelize, DataTypes } = require("sequelize");

const TodoItem = (Sequelize, DataTypes) => {
  return Sequelize.define("TodoItem", {
    text: DataTypes.STRING,
    todoId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Todos",
        key: "id"
      }
    },
    isCompleted: DataTypes.BOOLEAN,
  });
};

module.exports= TodoItem;
