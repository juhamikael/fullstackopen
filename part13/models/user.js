// /models/user.js
const { sequelize } = require("../util/db");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 20],
          msg: "Username must be between 3 and 20 characters long",
        },
        uniqueUsername: async (username) => {
          const existingUser = await User.findOne({ where: { username } });
          if (existingUser) {
            throw new Error("Username already exists");
          }
        },
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
        uniqueEmail: async (email) => {
          const existingEmail = await User.findOne({ where: { email } });
          if (existingEmail) {
            throw new Error("Email already exists");
          }
        }
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "user",
  }
);

module.exports = User;
