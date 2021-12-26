const { Sequelize, DataTypes } = require("sequelize");

const Transcations= (Sequelize, DataTypes) => {
    return Sequelize.define("Transcations", {
        text: DataTypes.STRING,
        amount: DataTypes.INTEGER,
          creator: {
            type: DataTypes.STRING,
            references: {
                model: "users",
                key: "username"
            }
        }
    })
}

module.exports = Transcations;