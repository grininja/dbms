const { Sequelize, DataTypes } = require("sequelize");
const Todo = (Sequelize, DataTypes) => {
  return Sequelize.define(
    "Todo",
    {
      title: DataTypes.STRING,
      creator: {
        type:DataTypes.STRING,
        references: {
          model: "users",
          key: "username",
        },
      }
    }
  );
};
module.exports = Todo;
