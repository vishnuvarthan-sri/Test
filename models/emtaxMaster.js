  


module.exports=(sequelize,Sequelize)=>{

    const master = sequelize.define('em_currency_conversion_master', {
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
      'createdAt': {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
        comment: "null"
      },
      'updatedAt': {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now'),
        comment: "null"
      },
      'country_id': {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "null"
      }
    }, {
      tableName: 'em_currency_conversion_master'
    });
    return master
  }
