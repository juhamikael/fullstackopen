// migrations 5
const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
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
      session_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions");
  },
};
