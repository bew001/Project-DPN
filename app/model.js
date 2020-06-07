var express = require('express');
var router = express.Router();
var  mysql = require('mysql');


router.get('/', function(req, res){
    console.log('/modeling');
    let answer = "";
    answer = answer ;


    answer = [[[1, 2],[3,5.12],[5,13.1],[7,33.6],[9,85.9],[11,219.9]]];
    res.send(answer);
    res.end();


});


module.exports = router;
