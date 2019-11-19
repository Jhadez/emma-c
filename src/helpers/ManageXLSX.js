

const XLSX = require('xlsx');
var csv = require('fast-csv');
const fs = require('fs');
const path = require("path");


const getIndex = sheet => {
    return sheet["!ref"].split(":")[1][0];
}

class ManageXLSX{

    constructor(){
        this.path = null;
    }
    readFile(path){
    }

    writeFileData(file_data, file_name){
       
        var wb = XLSX.read(file_data), ws = wb.Sheets["Sheet1"],csv_ws=-1, flag=true;
        
        try{
            let aoa = this.convert_to_aoa(ws);
            csv_ws = fs.createWriteStream(file_name);

            csv.write(
                aoa,
                {headers: false},
            ).pipe(csv_ws).on("error", function(){
                    console.log("something wrong happened!");
                    flag=false;
                }).on("finish", function(){
                    console.log("done!");
                    flag=false;
                });
            this.path = file_name;
            require('deasync').loopWhile(function(){return flag});
        }catch(e){
            console.log(e);
        }
        return wb;
    }

    convert_to_aoa(sheet){
        var array_objects = Object.keys(sheet), array_values = Object.values(sheet), response=[], row=[], cont = "1";

        for(let i=0;i<array_objects.length;i++){
            if(array_objects[i] != "!ref"){
                if(array_objects[i].substring(1) != "1"){
                    if(cont == array_objects[i].substring(1)){
                        row.push(array_values[i].v);
                        (array_objects[i+1] == "!ref")?response.push(row):null;
                    }else{
                        if(cont != "1"){
                            response.push(row);
                            row = [array_values[i].v];
                        }else{
                            row.push(array_values[i].v)
                        }
                    }
                }
                cont = array_objects[i].substring(1);
            }
        }
        return response;
    }


    readFileData(){

        var bitmap = -1;
        console.log("path: "+this.path);
        // console.log("Path: "+path.join(`${__dirname}/../../${this.path}`));
        fs.readFile(path.join(`${__dirname}/../../${this.path}`), (error, data)=>{

            if(!error){
                bitmap = data;
            }else{
                console.log("Error: "+error.toString());
                bitmap = -2;
            }
            
        });
        require('deasync').loopWhile(function(){return bitmap==-1});
        // convert binary data to base64 encoded string
        return Buffer.from(bitmap).toString('base64');
    }
}

module.exports = ManageXLSX;