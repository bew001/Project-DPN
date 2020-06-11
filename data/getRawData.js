var express = require('express');
var router = express.Router();
var dat = require('../logging/date')

const https = require('https');
const cheerio = require('cheerio');
const HtmlTableToJson = require('html-table-to-json');
const sqljson = require('../sql/connect-json');

function clean( s ) {
    s = s.toString().split("#").join("rank");
    s = s.split('Country,Other').join('country');
    s = s.split('TotalCases').join('totalcases');
    s = s.split('NewCases').join('newcases');
    s = s.split('TotalDeaths').join('totaldeaths');
    s = s.split('NewDeaths').join('newdeaths');
    s = s.split('TotalRecovered').join('totalrecovered');
    s = s.split('NewRecovered').join('newrecovered');
    s = s.split('ActiveCases').join('activecases');
    s = s.split('Serious,Critical').join('serious');
    s = s.split('Tot Cases/1M pop').join('totalcasesper1mpop');
    s = s.split('Deaths/1M pop').join('deathper1mpop');
    s = s.split('TotalTests').join('totaltests');
    s = s.split('Tests/\\n1M pop').join('testsper1mpop');
    s = s.split('Tests/\\n 1M pop').join('testsper1mpop'); //don't know why we need this in different manners
    s = s.split('Population').join('population');
    s = s.split('Continent').join('continent');
    s = s.split('1 Caseevery X ppl').join('caseevery');
    s = s.split('1 Deathevery X ppl').join('deathevery');
    s = s.split('1 Testevery X ppl').join('testevery');
    s = s.split('[').join('');
    s = s.split(']').join('');
    s = s.split("\'\'").join('null');

    s = '[' + s + ']';

return s ;
}

var data ='';
let x = 1;

router.get('/', function(req, res){

https.get('https://www.worldometers.info/coronavirus/', (resp) => {
    //let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        //console.log(data);
        const $ = cheerio.load(data);
        let resul = $('#main_table_countries_yesterday').html();
        ///console.log(resul);
        resul = '<table> ' + resul + ' </table>';
        //let ti = HtmlTableToJson.parse(resul).results;
        //let yi = JSON.stringify(HtmlTableToJson.parse(resul).results).toString();
        //let yii = clean(JSON.stringify(HtmlTableToJson.parse(resul).results).toString());
        let fd = JSON.parse(clean(JSON.stringify(HtmlTableToJson.parse(resul).results).toString()));
        //console.log(fd.length);
        //console.log(fd[1]);
        //console.log(fd);

        for (var i = 0;i < fd.length;i++)
        {
            // console.log(fd[i]);
            // console.log(fd[i].rank);
            if (fd[i].rank == '')
                fd[i].rank = 0;
            else
                fd[i].rank = Number.isInteger(parseInt(fd[i].rank.split(',').join(''))) ? parseInt(fd[i].rank.split(',').join('')) : 0;

            if (fd[i].country == '')
                fd[i].country = 'null';

            if (fd[i].totalcases == '')
                fd[i].totalcases = 0;
            else
                fd[i].totalcases = Number.isInteger(parseInt(fd[i].totalcases.split(',').join(''))) ? parseInt(fd[i].totalcases.split(',').join('')) : 0;

            if (fd[i].newcases == '')
                fd[i].newcases = 0;
            else
                fd[i].newcases = Number.isInteger(parseInt(fd[i].newcases.split(',').join(''))) ? parseInt(fd[i].newcases.split(',').join('')) : 0;

            if (fd[i].totaldeaths == '')
                fd[i].totaldeaths = 0;
            else
                fd[i].totaldeaths = Number.isInteger(parseInt(fd[i].totaldeaths.split(',').join(''))) ? parseInt(fd[i].totaldeaths.split(',').join('')) : 0;

            if (fd[i].newdeaths == '')
                fd[i].newdeaths = 0;
            else
                fd[i].newdeaths = Number.isInteger(parseInt(fd[i].newdeaths.split(',').join(''))) ? parseInt(fd[i].newdeaths.split(',').join('')) : 0;

            if (fd[i].totalrecovered == '')
                fd[i].totalrecovered = 0;
            else
                fd[i].totalrecovered = Number.isInteger(parseInt(fd[i].totalrecovered.split(',').join(''))) ? parseInt(fd[i].totalrecovered.split(',').join('')) : 0;

            if (fd[i].newrecovered == '')
                fd[i].newrecovered = 0;
            else
                fd[i].newrecovered = Number.isInteger(parseInt(fd[i].newrecovered.split(',').join(''))) ? parseInt(fd[i].newrecovered.split(',').join('')) : 0;

            if (fd[i].activecases == '')
                fd[i].activecases = 0;
            else
                fd[i].activecases = Number.isInteger(parseInt(fd[i].activecases.split(',').join(''))) ? parseInt(fd[i].activecases.split(',').join('')) : 0;

            if (fd[i].serious == '')
                fd[i].serious = 0;
            else
                fd[i].serious= Number.isInteger(parseInt(fd[i].serious.split(',').join(''))) ? parseInt(fd[i].serious.split(',').join('')) : 0;

            if (fd[i].totalcasesper1mpop == '')
                fd[i].totalcasesper1mpop = 0;
            else
                fd[i].totalcasesper1mpop = Number.isInteger(parseInt(fd[i].totalcasesper1mpop.split(',').join(''))) ? parseInt(fd[i].totalcasesper1mpop.split(',').join('')) : 0;

            if (fd[i].deathper1mpop == '')
                fd[i].deathper1mpop = 0;
            else
                fd[i].deathper1mpop = Number.isInteger(parseInt(fd[i].deathper1mpop.split(',').join(''))) ? parseInt(fd[i].deathper1mpop.split(',').join('')) : 0;

            if (fd[i].totaltests == '')
                fd[i].totaltests = 0;
            else
                fd[i].totaltests = Number.isInteger(parseInt(fd[i].totaltests.split(',').join(''))) ? parseInt(fd[i].totaltests.split(',').join('')) : 0;

            if (fd[i].testsper1mpop == '')
                fd[i].testsper1mpop = 0;
            else
                fd[i].testsper1mpop = Number.isInteger(parseInt(fd[i].testsper1mpop.split(',').join(''))) ? parseInt(fd[i].testsper1mpop.split(',').join('')) : 0;

            if (fd[i].population == '')
                fd[i].population = 0;
            else
                fd[i].population = Number.isInteger(parseInt(fd[i].population.split(',').join(''))) ? parseInt(fd[i].population.split(',').join('')) : 0;

            if (fd[i].continent == '')
                fd[i].continent = 'null';

            if (fd[i].caseevery == '')
                fd[i].caseevery = 0;
            else
                fd[i].caseevery = Number.isInteger(parseInt(fd[i].caseevery.split(',').join(''))) ? parseInt(fd[i].caseevery.split(',').join('')) : 0;

            if (fd[i].deathevery == '')
                fd[i].deathevery = 0;
            else
                fd[i].deathevery = Number.isInteger(parseInt(fd[i].deathevery.split(',').join(''))) ? parseInt(fd[i].deathevery.split(',').join('')) : 0;

            if (fd[i].testevery == '')
                fd[i].testevery = 0;
            else
                fd[i].testevery = Number.isInteger(parseInt(fd[i].testevery.split(',').join(''))) ? parseInt(fd[i].testevery.split(',').join('')) : 0;
            console.log(dat.addDay(-1));
            //fd[i].data.add('date');
            fd[i].date =   dat.addDay(-1) ;

        }
        console.log(fd);
        for (var i = 0 ; i < fd.length ; i++)
        {
            //number of max connections in mysql was set 320 in order to handle number of rows
            if (! (fd[i].country.includes('Total') || fd[i].country.includes('null'))) // do not include records of totals
            sqljson.queryinsert('raw',fd[i]);

        }

        // console.log(fd[0]);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
    res.end();
});
module.exports = router;