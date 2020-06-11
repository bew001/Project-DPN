var express = require('express');
var router = express.Router();
var  mysql = require('mysql');
var sql = require('../sql/connect');


router.get('/', function(req, res){
    console.log('/getCountryModel');

    sql.queryfetch("select country from parameters group by country",res);
    // console.log(answer);
    // if (answer.result == 'ok')
    // {
    //     res.json(answer);
    //     res.end();
    // }


});


module.exports = router;
