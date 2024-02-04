// ./models/blog.js
const { sequelize } = require("../util/db");
const { Model, DataTypes } = require("sequelize");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1991,
          msg: "Year must be greater than 1991",
        },
        max: {
          args: new Date().getFullYear(),
          msg: `Year must be less than ${new Date().getFullYear()}`,
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },

    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blog",
  }
);

module.exports = Blog;
