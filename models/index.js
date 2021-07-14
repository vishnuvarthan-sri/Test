"use strict";
require("dotenv").config();
const Sequelize = require("sequelize");
const configs = require('../config/config.js');

  let sequelize = new Sequelize(
    configs.database,
  configs.username,
  configs.password, {  
        host: configs.host,
        dialect:configs.dialect
    }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  db.Master = require("./emtaxMaster")(sequelize, Sequelize);
  db.conv = require("./emtaxConv")(sequelize, Sequelize);
  
  module.exports = db;

