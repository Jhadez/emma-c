var xlsx = require('xlsx');
console.log(`${__dirname}`);

var wb = xlsx.readFile(`${__dirname}/${"ahs - template file.xlsx"}`);

wb.Sheets["Sheet1"]["A1"] = "Rafa se la come";

console.log(JSON.stringify(wb));

xlsx.writeFile(wb, `${__dirname}/${"ahs - template file.xlsx"}`);

let newWS = xlsx.utils.sheet_to_csv(wb.Sheets["Sheet1"]);

console.log("CSV ------ > "+JSON.stringify(newWS));


// var ws = wb.Sheets["data"];

// var data = xlsx.utils.sheet_add_json(data);

// var newData = data.map(function (record) {
// 	return record;
// });

// console.log(newData);

// var newWB = xlsx.utils.book_new();
// var newWS = xlsx.utils.sheet_to_csv(newData);
// xlsx.utils.book_append_sheet(newWB, newWS, "New Data");

// xlsx.writeFile(newWB, "new data file.csv");