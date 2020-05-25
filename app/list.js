var express = require('express');
var router = express.Router();
var  mysql = require('mysql');
var sql = require('../sql/connect');


router.post('/', function(req, res){
    console.log('/listAction');

    let answer = sql.queryfetch("select * from raw",res);
    // console.log(answer);
    // if (answer.result == 'ok')
    // {
    //     res.json(answer);
    //     res.end();
    // }


    });


module.exports = router;
