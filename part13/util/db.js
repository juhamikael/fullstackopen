// util/db.js
const Sequelize = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL);

const migrationConf = {
  migrations: {
    glob: "migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();

  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};
const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Error while connecting to the database:", err);
    process.exit(1);
  }

  return sequelize;
};

module.exports = { connectToDatabase, sequelize, rollbackMigration };
