const { Sequelize, DataTypes } = require("sequelize");

const Groups = (Sequelize, DataTypes) => {
  return Sequelize.define("groups", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    groupName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    groupDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    groupMembers:{
        type: DataTypes.STRING,
        allowNull: true,
        references:{
            model:'users',
            key:'username'
        }
    }
    
  });
};

module.exports=Groups;