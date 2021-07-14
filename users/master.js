
// var master = require('./models/emtaxMaster.js');
// var conv = require('./models/emtaxConv.js');
const models = require('../models')
const Sequelize = require("sequelize");



exports.insert_exchange_rates = async (
    effective_date,
    country_id,
    uae_ex_rates,
    req,
    res
  ) => {
    let currency_array = [];
    effective_date = await getdate(effective_date);
    await uae_ex_rates.forEach((value, index) => {
      let currency_obj = {};
      if (!isNaN(parseFloat(value["Currency"]))) {
        console.log("effective_date", effective_date);
        currency_obj["effective_date"] = effective_date;
        currency_obj["unit"] = 1;
        if (counrty_map_array[value["Country"]]) {
          currency_obj["from_curr"] = counrty_map_array[value["Country"]];
        } else {
          currency_obj["from_curr"] = value["Country"];
        }
        currency_obj["to_curr"] = countryDetails[ExRateCountryId].code;
        currency_obj["em_country_id"] = country_id;
        currency_obj["exchange_rate"] = parseFloat(value["Currency"]);
        currency_obj["createdAt"] = new Date();
        currency_obj["updatedAt"] = new Date();
        currency_array.push(currency_obj);
      }
    });
    if (currency_array.length > 0) {
      currency_array.push({
        effective_date,
        unit: 1,
        from_curr: countryDetails[ExRateCountryId].code,
        to_curr: countryDetails[ExRateCountryId].code,
        exchange_rate: 1,
        em_country_id: country_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    if (currency_array.length > 0) {
      await models.em_currency_conversion_master
        .findAll({
          attributes: ["id"],
          where: {
            effective_date,
            country_id,
          },
        })
        .then(async (body) => {
          if (body.length > 0) {
            await delete_currency_master(
              effective_date,
              country_id,
              currency_array,
              req,
              res
            );
          } else {
            if (currency_array.length > 0) {
              await insert_currency_master(
                effective_date,
                country_id,
                uae_ex_rates,
                req,
                res
              );
            } else {
              console.log("Invalid effective date");
            }
          }
        })
        .catch((err) => {
          console.log("Error", err);
          FxRateAutoUpdater(req, res);
        });
    } else {
      console.log("No Rows Found to Insert Exchange Rates");
    }
  };


  const delete_currency_master = async (
    effective_date,
    country_id,
    currency_array,
    req,
    res
  ) => {
    await models.em_currency_conversion_master
      .destroy({
        where: {
          effective_date,
          country_id,
        },
      })
      .then(async () => {
        if (currency_array.length > 0) {
          await delete_currency(
            effective_date,
            country_id,
            currency_array,
            req,
            res
          );
        } else {
          console.log("Invalid effective date");
        }
      })
      .catch((err) => {
        console.log("Error", err);
        FxRateAutoUpdater(req, res);
      });
  };
//   const delete_currency = async (
//     effective_date,
//     country_id,
//     currency_array,
//     req,
//     res
//   ) => {
//     await models.Master
//       .destroy({
//         where: {
//           effective_date,
//           em_country_id: country_id,
//         },
//       })
//       .then(async () => {
//         if (currency_array.length > 0) {
//           await insert_currency_master(
//             effective_date,
//             country_id,
//             currency_array,
//             req,
//             res
//           );
//         } else {
//           console.log("Invalid effective date");
//         }
//       })
//       .catch((err) => {
//         console.log("Error", err);
//         FxRateAutoUpdater(req, res);
//       });
//   };

  //master
  exports.insert_currency_master = async (masterData) => {
    await models.Master
      .bulkCreate(masterData,{ignoreDuplicates:true})
      .then(async (body) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log("Error", err);
      });
    
  };
  //

  //master
  exports.insert_currency_conversion = async (masterData) => {
    await models.Master
      .bulkCreate(masterData)
      .then(async (body) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log("Error", err);
      });
    
  };
  //


  const insert_currency = async (
    effective_date,
    country_id,
    currency_array,
    master_id,
    req,
    res
  ) => {
    await models.em_currency_conversion
      .bulkCreate(currency_array, {
        returning: ["id"],
      })
      .then(async () => {
        await update_mater_id(effective_date, country_id, master_id, req, res);
      })
      .catch((err) => {
        console.log("Error", err);
        FxRateAutoUpdater(req, res);
      });
  };
  const update_mater_id = async (
    effective_date,
    country_id,
    master_id,
    req,
    res
  ) => {
    await models.em_currency_conversion
      .update(
        {
          master_id,
        },
        {
          where: {
            effective_date,
            em_country_id: country_id,
          },
        }
      )
      .then(() => {
        console.log(
          "Exchange Rates are successfully inserted for country " + country_id
        );
        let request_values = {};
        request_values["data"] = data;
        request_values["iTotalRecords"] = data.length;
        request_values["iTotalDisplayRecords"] = data.length;
        res.send(200, request_values);
        sendSMS(
          NodeENV +
            " : " +
            countryDetails[ExRateCountryId].name +
            " Exchange Rates on " +
            uae_date +
            " has been inserted successfully at " +
            moment(new Date()).utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss")
        );
      })
      .catch((err) => {
        console.log("Error", err);
        FxRateAutoUpdater(req, res);
      });
  };
  const getdate = (date_str) => {
    var invoicedate;
    if (isNaN(date_str)) {
      invoicedate = moment(date_str).format("YYYY-MM-DD");
    } else {
      var dateString = new Date((date_str - (25567 + 2)) * 86400 * 1000);
      invoicedate = moment(dateString).format("YYYY-MM-DD");
    }
    if (invoicedate != "Invalid date") {
      return invoicedate;
    }
  };
  
