'use strict';

const ManageXLSX = require('./ManageXLSX');
const BlueMail = require('./BlueMail');

class FileConverter{

    constructor(){
        this.file = null;
    }

    convertFile(file, email, accName){
        const manageXLSX = new ManageXLSX(), bluemail = new BlueMail();
        let response=-1, database64=-1, flag=true;
        response = manageXLSX.writeFileData(file.data, file.name);
        require('deasync').loopWhile(function(){return response==-1});
        

        database64 = manageXLSX.readFileData();
        require('deasync').loopWhile(function(){return database64==-1});

        bluemail.sendMail(database64, file.name, email, accName);
        return response;
    }

}

module.exports = FileConverter;