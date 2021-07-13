const dotenv = require("dotenv");
dotenv.config();

 const configs = {
    username: process.env.STAGE_DB_USER_NAME,
    password: process.env.STAGE_DB_SECRET,
    database: process.env.STAGE_DB,
    host: process.env.STAGE_DB_HOST,
    port: process.env.STAGE_DB_PORT,
    dialect: "postgres",
};
module.exports = configs;