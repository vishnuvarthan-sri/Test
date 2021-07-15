
// var master = require('./models/emtaxMaster.js');
// var conv = require('./models/emtaxConv.js');
const models = require('../models')
const Sequelize = require("sequelize");
const { raw } = require('express');



exports.insert_exchange_rates = async (
    effective_date,
    country_id,
    to_curr,
    uae_ex_rates,
    req,
    res
  ) => {
     await models.Master
     .findAll({
        where: {
            effective_date
        },
        raw:true
     })
      .then(async(data)=>{   
          await data.map(async(data1)=>{
              await uae_ex_rates.map(async(element,index)=>{
                  if(element.Date == data1.effective_date){
                    await models.conv
                                     .create({
                                        effective_date:element.Date,
                                        unit:1,
                                        from_curr:element.__EMPTY,
                                        to_curr:to_curr,
                                        exchange_rate:element.Rate,
                                        createdAt:new Date(),
                                        updatedAt:new Date(),
                                        em_country_id:country_id,
                                        master_id:data1.id
                                     })
                                     .then(async (body) => {
                                        console.log("Success conv");
                                      })
                                      .catch((err) => {
                                        console.log("Error", err);
                                      });

                  }
              })      
          })
      })
      .catch((err)=>{
          res.status(400).send(err)
      })
  };



  exports.insert_currency_master = async (effective_date,country_id) => {
    await models.Master
      .create({
          effective_date,
          country_id,
          createdAt:new Date(),
          updatedAt:new Date()
      })
      .then(async (body) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log("Error", err);
      });
    
  };
  //




  
  
