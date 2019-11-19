var xlsx = require('xlsx');
console.log(`${__dirname}`);

var wb = xlsx.readFile(`${__dirname}/${"ahs - template file.xlsx"}`);

wb.Sheets["Sheet1"]["A1"] = "Rafa se la come";

console.log(JSON.stringify(wb));

xlsx.writeFile(wb, `${__dirname}/${"ahs - template file.xlsx"}`);

let newWS = xlsx.utils.sheet_to_csv(wb.Sheets["Sheet1"]);

console.log("CSV ------ > "+JSON.stringify(newWS));
