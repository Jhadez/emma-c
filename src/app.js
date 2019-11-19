'use strict';

const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const nano = require('nano')('DB_URL');
var db = nano.use('emma');
const fileUpload = require('express-fileupload');
var session = require('express-session');
require('dotenv').config({silent: true});
const morgan = require('morgan');
const passport = require('passport');
const flash = require('connect-flash');


//Init app 
const app = express();
require('./passport/local-auth');

var cfenv = require('cfenv');
const appEnv = cfenv.getAppEnv();

 
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

app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));

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
app.use(require('./routes/routes.js'));
app.use(require('./routes/login.js'));

//Port# 
var port = appEnv.port || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
