'use strict';

const db = require("../connectiondb.js")();
// const  nano = require('nano')('https://6be5f59a-205a-44bb-871c-896b39f3e4d0-bluemix:ad112ff661f13ef30c943ad6c3ce947181077ae9de7f753820fcfe052b372e18@6be5f59a-205a-44bb-871c-896b39f3e4d0-bluemix.cloudant.com');
// const db = nano.use('emma');

module.exports = function(){

	var functions = {
		find_user: async function(email){
            
            return(
                await db.get(email)
                .then((body) => {
                    return true;
                })
                .catch((error)=>{
                    console.log("Something wrong happened."+ error);
                    return false;
                })
            )
        },
        list_user: async function(){
            return (
                await db.list().then((body) => {
                    body.rows.forEach((doc) => {
                      console.log(doc);
                    });
                    return body;
                  })
                  .catch((error)=>{
                    console.log("Something wrong happened."+ error);
                    return 0;
                })
            )
        }
    }
    return functions;
}