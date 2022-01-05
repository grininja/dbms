const { Sequelize, DataTypes } = "sequelize";

const Admin = (Sequelize, DataTypes) => {
  return Sequelize.define("Admin", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      references: { model: "users", key: "username" },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    }
  });
};
module.exports= Admin;
