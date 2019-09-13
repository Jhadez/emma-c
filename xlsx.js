var xlsx = require('xlsx');

var wb = xlsx.readFile("ahs - template file.csv");

var ws = wb.Sheets["data"];

var data = xlsx.utils.sheet_add_json(data);

var newData = data.map(function (record) {
	return record;
});

console.log(newData);

var newWB = xlsx.utils.book_new();
var newWS = xlsx.utils.sheet_to_csv(newData);
xlsx.utils.book_append_sheet(newWB, newWS, "New Data");

xlsx.writeFile(newWB, "new data file.csv");