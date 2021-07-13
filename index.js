var express = require("express");
var app = express();

if(typeof require !== 'undefined') XLSX = require('xlsx');
var file = XLSX.readFile('testDoc.ods',{cellDates:true});

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

app.get('/',(req,res)=>{
res.send({data:data})
})


app.listen(8000, function () {
	console.log('Example app listening on port 8000!')
  });