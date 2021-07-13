var express = require("express");
var app = express();
const sequelize = require('./models/index.js');
var master = require('./models/emtaxMaster.js');
var conv = require('./models/emtaxConv.js');

sequelize.sync() 
sequelize.sync({force:true})

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

let Dates=[];
 data.filter((hero) =>{
	Dates.push({"Date":hero.Date})
});

let timeData=[]
data.map((index)=>{
	Dates.forEach((date)=>{
		if(date.Date === index.Date){
			timeData.push(index)
		}
	})
})


app.get('/',(req,res)=>{
res.send(timeData)
})


app.listen(8000, function () {
	console.log('Example app listening on port 8000!')
  });