'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nano = require('nano')('https://6be5f59a-205a-44bb-871c-896b39f3e4d0-bluemix:ad112ff661f13ef30c943ad6c3ce947181077ae9de7f753820fcfe052b372e18@6be5f59a-205a-44bb-871c-896b39f3e4d0-bluemix.cloudant.com');
var db = nano.use('emma');
const fileUpload = require('express-fileupload');
var session = require('express-session');
require('dotenv').config({silent: true});
const passport = require('passport');
const flash = require('connect-flash');

var cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();


//Init app 
const app = express();
require('./src/passport/local-auth');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));

 
/*Middleware Start
----------------------------------------
*/
app.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 },
  }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: '123456',
	resave: false,
	saveUninitialized: false
}));

// app.use(morgan('dev'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


/*Middleware End
----------------------------------------
//Note: start the nodemon server (npm run dev)
*/

app.post("/emma", function (req, res) {
	console.log(req.body);
	var response = false;
	var flag = true;
	db.insert(req.body, function (err, body) {
		if (!err) {
			console.log(body);
			response = true
		} else {
			console.log(err);
		}
		flag = false;
	});
	require('deasync').loopWhile(function () {
		return flag;
	});
	res.send({
		message: response,
	});
});

//Routes
app.use(require('./src/routes/routes.js'));
app.use(require('./src/routes/login.js'));

//Port# 
var port = appEnv.port || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
