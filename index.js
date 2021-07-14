var express = require("express");
var app = express();
const db = require('./models');
var users = require('./users/master.js');
const _ = require('lodash');

db.sequelize.sync()
db.sequelize.sync({force:true})

if(typeof require !== 'undefined') XLSX = require('xlsx');
var file = XLSX.readFile('Uae Exchange rate Feb to Jun 21.xlsx',{cellDates:true});

let data = []

const sheets = file.SheetNames

for(let i = 0; i < sheets.length; i++)
{
const temp = XLSX.utils.sheet_to_json(
		file.Sheets[file.SheetNames[i]])
temp.forEach((res) => {
	data.push(res)
})
}



let masterData =[];
let master = data.map((hero) =>{
	 let Index = hero.Date.toISOString().split('T')[0]
	hero.Date = Index;
	return hero;	
});
var groupBy = _.groupBy(master,function(data){
	return data.Date
});
var Dates = Object.keys(groupBy);
Dates.map((date)=>{		
		masterData.push({"effective_date":date,"country_id":5,"createdAt":new Date(),"updatedAt":new Date()})
	 })


app.post("/", async (req, res) => {
	try {
	  let result = await users.insert_currency_master(masterData)
	  res.status(200).send(result);
	} catch (error) {
	  res.status(error.statusCode || 400).send(error);
	}
  });

app.post("/conv",async(req,res)=>{
	try {
		let result = await users.insert_currency_conversion(masterData)
		res.status(200).send(result);
	  } catch (error) {
		res.status(error.statusCode || 400).send(error);
	  }
})

app.get('/data',(req,res)=>{
res.send(data)
})


app.listen(8000, function () {
	console.log('Example app listening on port 8000!')
  });


 const ExRateCountryId = 5;
const countryDetails = {
  5: {
    name: "UAE",
    url: "https://www.centralbank.ae/en/fx-rates",
    code: "AED",
  },
  8: {
    name: "Bahrain",
    url: "https://www.cbb.gov.bh/facilities-interest-rates/#exchange-rates",
    code: "BHD",
  },
};
const counrty_map_array = {
  "US Dollar": "USD",
  "Argentine Peso": "ARS",
  "Australian Dollar": "AUD",
  "Bangladesh Taka": "BDT",
  "Bahrani Dinar": "BHD",
  "Brunei Dollar": "BND",
  "Brazilian Real": "BRL",
  "Botswana Pula": "BWP",
  "Belarus Rouble": "BYN",
  "Canadian Dollar": "CAD",
  "Swiss Franc": "CHF",
  "Chilean Peso": "CLP",
  "Chinese Yuan - Offshore": "CNYO",
  "Chinese Yuan": "CNY",
  "Colombian Peso": "COP",
  "Czech Koruna": "CZK",
  "Danish Krone": "DKK",
  "Algerian Dinar": "DZD",
  "Egypt Pound": "EGB",
  "Euro": "EUR",
  "GB Pound": "GBP",
  "Hongkong Dollar": "HKD",
  "Hungarian Forint": "HUF",
  "Indonesia Rupiah": "IDR",
  "Indian Rupee": "INR",
  "Iceland Krona": "ISK",
  "Jordan Dinar": "JOD",
  "Japanese Yen": "JPY",
  "Kenya Shilling": "KES",
  "Korean Won": "KRW",
  "Kuwaiti Dinar": "KWD",
  "Kazakhstan Tenge": "KZT",
  "Lebanon Pound": "LBP",
  "Sri Lanka Rupee": "LKR",
  "Moroccan Dirham": "MAD",
  "Macedonia Denar": "MKD",
  "Mexican Peso": "MXN",
  "Malaysia Ringgit": "MYR",
  "Nigerian Naira": "NGN",
  "Norwegian Krone": "NOK",
  "NewZealand Dollar": "NZD",
  "Omani Rial": "OMR",
  "Peru Sol": "PEN",
  "Philippine Piso": "PHP",
  "Pakistan Rupee": "PKR",
  "Polish Zloty": "PLN",
  "Qatari Riyal": "QAR",
  "Serbian Dinar": "RSD",
  "Russia Rouble": "RUB",
  "Saudi Riyal": "SAR",
  "Swedish Krona": "SEK",
  "Singapore Dollar": "SGD",
  "Thai Baht": "THB",
  "Tunisian Dinar": "TND",
  "Turkish Lira": "TRY",
  "Trin Tob Dollar": "TTD",
  "Taiwan Dollar": "TWD",
  "Tanzania Shilling": "TZS",
  "Uganda Shilling": "UGX",
  "Vietnam Dong": "VND",
  "South Africa Rand": "ZAR",
  "Zambian Kwacha": "ZMW",
  "Sudanese Pound": "SDG",
  "Yemen Rial": "YER",
  "Zambian Kwacha": "ZMK",
  "Azerbaijan manat": "AZN",
  "Bulgarian lev": "BGN",
  "Croatian kuna": "HRK",
  "Ethiopian birr": "ETB",
  "Iraqi dinar": "IQD",
  "Israeli new shekel": "ILS",
  "Libyan dinar": "LYD",
  "Mauritian rupee": "MUR",
  "Romanian leu": "RON",
  "Syrian pound": "SYP",
  "Turkmen manat": "TMT",
  "Uzbekistani som": "UZS",
};
const months = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};