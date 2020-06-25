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
    console.log(req.query.method);
    sql.queryinsert('insert into selections (email,p1,p2) values (\'' +req.session.email + '\',\''+ req.query.p1 + '\',\'' + req.query.p2 + '\');');
    if (req.query.method==='model') {
        //p1 is the source country , p2 destination country , p3 is the grouping method
        let q1 = 'call model(\'' + req.query.p1 + '\',\'' + req.query.p2 + '\',' + healthcareWeight + ',' + ageWeight + ',' +
            '' + socialWeight + ',' + testsWeight + ',' + transitWeight + ',' + totalWeight + ');';

        console.log(q1);
        sql.queryfetch(q1, res);
    }
    else if (req.query.method==='compare'){
        //p1 is the source country , p2 destination country , p3 is the grouping method
        let q2 = 'call compare(\'' + req.query.p1 + '\',\'' + req.query.p2 + '\');';

        console.log(q2);
        sql.queryfetch(q2, res);

    }
    else
    {
        console.log('error in receiving method in moduling');
        res.send('error');

    }

});


module.exports = router;
