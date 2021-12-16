const { Sequelize, Model, Op } = require("sequelize");
const models = require("./model");
const { User, Stories, Task ,Groups} = models;

const setassociation = () => {
  User.hasMany(Stories,{foreignKey:"author",targetKey:'author'});
  User.hasMany(Task,{foreignKey:"creator",targetKey:'creator'});
  // Stories.hasOne(User);
  // Task.hasOne(User);
};

module.exports = setassociation;
