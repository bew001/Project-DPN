var express = require('express');
var router = express.Router();
var  mysql = require('mysql');
var sql = require('../sql/connect');


var healthcareWeight = 3;
var ageWeight = 1;
var socialWeight = 2;
var testsWeight = 1;
var transitWeight = 2;

var totalWeight = 9;


router.get('/', function(req, res){
    console.log('/modeling');

    let q='call model(\''+req.query.p1+'\',\''+req.query.p2+'\','+ healthcareWeight +','+ageWeight +',' +
        ''+socialWeight +','+testsWeight +','+transitWeight +','+totalWeight +');';

    console.log(q);
    sql.queryfetch(q,res);


});


module.exports = router;
