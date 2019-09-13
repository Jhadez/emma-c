"use strict";

module.exports = function(){

    var nano = require('nano')('https://'+ process.env.DB_USER +':'+ process.env.DB_PASS +'@'+ process.env.DB_HOST);
    return nano.use('emma');

}
