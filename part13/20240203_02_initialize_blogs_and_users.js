// migrations 3
const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("blogs", "year", {
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
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("blogs", "year");
  },
};
