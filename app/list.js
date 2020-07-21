var express = require('express');
var router = express.Router();
var  mysql = require('mysql');
var sql = require('../sql/connect');


router.get('/', function(req, res){
    console.log('/listAction');
    var today = new Date();
    var dd = today.getDate()-1;
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    }

    if(mm<10)
    {
        mm='0'+mm;
    }

    today = yyyy+'-'+mm+'-'+dd;
    today = '2020-07-15'; //this value is set for the date sent to professor because when sending this his database won't update
    console.log("select country,max(totalcases) as totalcases,max(newcases) as newcases,max(newdeaths) as newdeaths," +
        " continent from raw where raw.rank>0 and DATE_FORMAT(date, \"%Y-%m-%d\") = " + today + " group by country order by totalcases desc");
    console.log(today);
     sql.queryfetch("select country,max(totalcases) as totalcases,max(newcases) as newcases,max(newdeaths) as newdeaths," +
        " continent from raw where rank>0 and DATE_FORMAT(date, \"%Y-%m-%d\") = \"" + today + "\" group by country order by totalcases desc",res);



    });


module.exports = router;
