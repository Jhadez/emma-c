const { Router } = require('express');

const router = Router();

var fs = require('fs');

const FileConverter = require('../helpers/FileConverter');

// var multer  = require('multer')
// var upload = multer({dest: "../public/uploads"});

router.get("/", /* isAuthenticated,*/ (req, res) => {
	res.render("index", {name: req.session.name, email: req.session.email});
});

//upload
router.post('/upload', (req, res) => {

	console.log(JSON.stringify(req.body));

	let fileConverter = new FileConverter(), response= -1;

	if(!req.files || req.body.txt_acc_name == ""){
		res.send({response: false});
	}

	if(req.files.file_attached.mimetype != "text/csv"){
		res.send({response: false});
	}

	response = fileConverter.convertFile(req.files.file_attached, req.session.email, req.body.txt_acc_name);
	

	res.status(200).send({response: true});
});



router.get('/send',(req,res) => {
	var bodyData = {
			"contact": "sample@ibm.com",
			"recipients": [
				{"recipient": "sample@ibm.com"}            
			],
			"cc": [{"recipient": "sample@ibm.com"}],
			"subject": "BlueMail Test",
			"message": "Testing the email service. Defaults selected.",
			"attachments": [
				{
					"attachment": {
						"filename": "test.txt",
						"content_type":"text/plain",
						"data": "VGhpcyBpcyBhIGJhc2U2NCBlbmNvZGVkIHRleHQ="
					}
				}
			]
		
		};
		  
	var username = "//USERNAME";
	var password =  "//PASSWORD";
		  
	var base64uid = new Buffer(username + ":" + password).toString('base64');
   
   	var https = require('https');
		  
		var options = {
			host: '//IBM_MAIL_SERVICE',
			port: 443,
			path: '/rest/v2/emails',
			method: 'POST',  
			headers: { "Content-Type": "application/json; charset=utf-8", "Authorization": "Basic "+ base64uid }
		};
		callback = function(res) {
			res.on('data', function (chunk) {
				console.log('data');
		  });
		  res.on('end', function() {
			console.log('mail sent');
		  });
		}
		console.log('req st');
		var request = https.request(options, callback);
		console.log('req done');
	
		request.write(JSON.stringify(bodyData));
		console.log('req json');
		
		request.on('error', function(err) {
			console.log('Error - request on JSON call : ' + err);
			throw err;
		});
		request.end();
		console.log('req end');

		res.send();
		
   });


   function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.send({response: "access denied."});
}

module.exports = router;
