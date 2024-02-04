// models/readings.js
const {sequelize} = require("../util/db");
const { Model, DataTypes } = require("sequelize");

class Readings extends Model {}

Readings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blogs",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "readings",
  }
);

Readings.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  
  values = {
    id: values.id,
    user_id: values.userId,
    blog_id: values.blogId,
    read: values.read,
    created_at: values.createdAt,
    updated_at: values.updatedAt
  };
  
  return values;
};

module.exports = Readings;
