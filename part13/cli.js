// cli.js
const Blog = require("./models/blog");
require("dotenv").config({ path: ".env" });
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const listBlogs = async () => {
  try {
    const blogs = await Blog.findAll();
    blogs.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
  } finally {
    await sequelize.close();
  }
};

if (require.main === module) {
  listBlogs();
}