var express = require('express');
var router = express.Router();
var  mysql = require('mysql');
var sql = require('../sql/connect');


router.get('/', function(req, res){
    console.log('/listAction');

    let answer = sql.queryfetch("select country,max(totalcases) as totalcases from raw group by country",res);
    // console.log(answer);
    // if (answer.result == 'ok')
    // {
    //     res.json(answer);
    //     res.end();
    // }


    });


module.exports = router;
