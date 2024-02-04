// migrations 4
const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable(
      "readings",
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
        underscored: true,
        timestamps: true,
        modelName: "readings",
      }
    );
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("readings");
  },
};
