const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sessionActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "sessions",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Session;
