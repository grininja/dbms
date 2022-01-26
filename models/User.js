const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:root@localhost:3306/test");

const User = (Sequelize, DataTypes) => {
  return Sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    hasLogin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

module.exports = User;
