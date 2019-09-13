"use strict";

class BlueMail{

    constructor(){
		this.username = process.env.B_USER;
		this.password =  process.env.B_PASSWORD;
        this.callback = function(res) {
			res.on('data', function (chunk) {
				console.log('data');
		  });
		  res.on('end', function() {
			console.log('mail sent');
		  });
		}
    }

    sendMail(attached, file_name, email, accName){
        var bodyData = {
			"contact": email, //se debe sustituir email por el correo "robotics_gbsopscr@cr.ibm.com"
			"recipients": [
				{"recipient": "rgarcia@cr.ibm.com"}  //Sustituir a  Tonny por Direccion de correo "dsbillsm@bldvmb.vnet.ibm.com"         
			],
			"cc": [{"recipient": email }], //se debe sustituir email por correo "billadw1@us.ibm.com"
			"subject": accName,
			"message": " ",
			"attachments": [
				{
					"attachment": {
						"filename": file_name,
						"content_type":"text/csv",
						"data": attached
					}
				}
			]
		
		};

		  
		console.log(this.username + ":" + this.password);
	var base64uid = Buffer.from(this.username + ":" + this.password).toString('base64');
   
   	var https = require('https');
		  
		var options = {
			host: 'bluemail.w3ibm.mybluemix.net',
			port: 443,
			path: '/rest/v2/emails',
			method: 'POST',  
			headers: { "Content-Type": "application/json; charset=utf-8", "Authorization": "Basic "+ base64uid }
		};
		
	    console.log('req st');
		var request = https.request(options, this.callback);
		console.log('req done');
	
		request.write(JSON.stringify(bodyData));
		console.log('req json');
		
		request.on('error', function(err) {
			console.log('Error - request on JSON call : ' + err);
			throw err;
		});
		request.end();
		console.log('req end');
    }
}

module.exports = BlueMail;

