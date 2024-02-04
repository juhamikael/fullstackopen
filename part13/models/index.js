// models/index.js
const Blog = require("./blog");
const User = require("./user");
const Readings = require("./readings");
const Session = require("./session");

User.hasMany(Blog, { foreignKey: "userId" });
Blog.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Readings, { foreignKey: "userId" });
Readings.belongsTo(User, { foreignKey: "userId" });

Blog.hasMany(Readings, { foreignKey: "blogId" });
Readings.belongsTo(Blog, { foreignKey: "blogId" });

User.hasOne(Session, { foreignKey: "userId" });
Session.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  Blog,
  User,
  Readings,
  Session,
};
