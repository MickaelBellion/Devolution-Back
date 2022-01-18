const { Sequelize } = require("sequelize");
try {
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    define: {
      underscored: true,
    },
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000
    },
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    define: {
      timestamps:false
    }
  });
module.exports = sequelize;

} catch (error) {
  console.error(error);
  console.log('Connection with Sequelize does not work')
}

