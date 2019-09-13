var saml2 = require('saml2-js');
var Saml2js = require('saml2js') ;
const path = require("path");
const fs = require('fs');
const passport = require('passport');

const { Router } = require('express');

const router = Router();

const User = require("../models/User");


// Create service provider 
const sp_options = {
  entity_id: "https://emma-file-converter.w3ibm.mybluemix.net:443/metadata.xml",
  private_key: fs.readFileSync(path.join(`${__dirname}/../cert/key.pem`)).toString(),
  certificate: fs.readFileSync(path.join(`${__dirname}/../cert/cert.pem`)).toString(),
  assert_endpoint: "https://emma-file-converter.w3ibm.mybluemix.net:443/assert"
};
const sp = new saml2.ServiceProvider(sp_options);

const idp_options = {
  sso_login_url: "https://w3id.alpha.sso.ibm.com/auth/sps/samlidp2/saml20/logininitial?RequestBinding=HTTPPost&PartnerId=https://emma-file-converter.w3ibm.mybluemix.net:443/metadata.xml&NameIdFormat=email&Target=https://emma-file-converter.w3ibm.mybluemix.net/assert",
  

  certificates: fs.readFileSync(path.join(`${__dirname}/../cert/w3id.sso.ibm.com`)).toString()
};
const idp = new saml2.IdentityProvider(idp_options);

// ------ Define express endpoints ------ 
 
// Endpoint to retrieve metadata 
router.get("/metadata.xml",(req, res) => {
  res.type('application/xml');
  res.send(sp.create_metadata());
});

// Starting point for login
router.get("/login", function(req, res) {
  //console.log(idp);
  req.session.requestedURL = req.url;
  sp.create_login_request_url(idp, {}, function(err, login_url, request_id) {
    if (err != null)
      return res.send(500);
    console.log(login_url);
    res.redirect(login_url);
  });
});



// Assert endpoint for when login completes
router.post("/assert", (req, res, next)=>{
  var options = {request_body: req };

  var response = Buffer.from(req.body.SAMLResponse || req.body.SAMLRequest, 'base64');
  var parser = new Saml2js(response);
  var user = parser.toObject();
  console.log("User response: "+JSON.stringify(user));

  req.session.email = user.emailaddress;
  req.session.name = user.firstName + " " + user.lastName;
  req.body.email = user.emailaddress;
  req.body.password = user.uid;
  next();
}, passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/access_denied',
    failureFlash : true 
  })
);

  
  router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect('/');
  });

router.get('/test', async (req, res)=>{

    const user = new User();
    let response = 2;
    response = await user.find_user("tvenegas@cr.ibm.com");
    // console.log("response: "+response);
    res.status(200).send(response);
});

router.get("/access_denied", (req, res)=>{
  res.send({response: "access denied."});
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.send({response: "access denied."});
}


module.exports = router;