
  const sequelize = require('./index.js');
  const Sequelize = require("sequelize");
  
  var conv = sequelize.define('em_currency_conversion', {
      'id': {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "null",
        primaryKey: true,
        autoIncrement: true
      },
      'effective_date': {
        type: Sequelize.DATEONLY,
        allowNull: false,
        comment: "null"
      },
      'unit': {
        type: Sequelize.DOUBLE,
        allowNull: false,
        comment: "null"
      },
      'from_curr': {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "null"
      },
      'to_curr': {
        type: Sequelize.TEXT,
        allowNull: false,
        comment: "null"
      },
      'exchange_rate': {
        type:Sequelize. DOUBLE,
        allowNull: false,
        comment: "null"
      },
      'createdAt': {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "null"
      },
      'updatedAt': {
        type: Sequelize.DATE,
        allowNull: false,
        comment: "null"
      },
      'em_country_id': {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "null"
      },
      'master_id': {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "null"
      }
    }, {
      tableName: 'em_currency_conversion'
    });

    module.exports = conv;