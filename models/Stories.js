const { Sequelize, DataTypes } = require("sequelize");
const User = require("./User");
const Stories = (Sequelize, DataTypes) => {
  return Sequelize.define("stories", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      references:{
        model:'users',
        key:'username'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    sharewith: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

module.exports = Stories;
