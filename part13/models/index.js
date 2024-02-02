const Blog = require("./blog");
const User = require("./user");

const setupDatabase = async () => {
  try {
    console.log("Starting synchronization...");
    User.hasMany(Blog);
    Blog.belongsTo(User);
    await Blog.sync({ alter: true });
    console.log("Blog model synchronized successfully.");
    await User.sync({ alter: true });
    console.log("User model synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
    throw error;
  }
};

module.exports = {
  Blog,
  User,
  setupDatabase,
};
