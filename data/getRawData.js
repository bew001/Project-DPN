var express = require('express');
var router = express.Router();

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
    s = s.split('ActiveCases').join('activecases');
    s = s.split('Serious,Critical').join('serious');
    s = s.split('Tot Cases/1M pop').join('totalcasesper1mpop');
    s = s.split('Deaths/1M pop').join('deathper1mpop');
    s = s.split('TotalTests').join('totaltests');
    s = s.split('Tests/\\n1M pop').join('testsper1mpop');
    s = s.split('Tests/\\n 1M pop').join('testsper1mpop'); //don't know why we need this in different manners
    s = s.split('Population').join('population');
    s = s.split('Continent').join('continent');
    s = s.split('[').join('');
    s = s.split(']').join('');
    s = s.split("\'\'").join('null');

    s = '[' + s + ']';

return s ;
}

var data ='';
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
        let resul = $('#main_table_countries_today').html();
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
                fd[i].rank = parseInt(fd[i].rank.split(',').join(''));

            if (fd[i].country == '')
                fd[i].country = 'null';

            if (fd[i].totalcases == '')
                fd[i].totalcases = 0;
            else
                fd[i].totalcases = parseInt(fd[i].totalcases.split(',').join(''));

            if (fd[i].newcases == '')
                fd[i].newcases = 0;
            else
                fd[i].newcases = parseInt(fd[i].newcases.split(',').join(''));

            if (fd[i].totaldeaths == '')
                fd[i].totaldeaths = 0;
            else
                fd[i].totaldeaths = parseInt(fd[i].totaldeaths.split(',').join(''));

            if (fd[i].newdeaths == '')
                fd[i].newdeaths = 0;
            else
                fd[i].newdeaths = parseInt(fd[i].newdeaths.split(',').join(''));

            if (fd[i].totalrecovered == '')
                fd[i].totalrecovered = 0;
            else
                fd[i].totalrecovered = parseInt(fd[i].totalrecovered.split(',').join(''));

            if (fd[i].activecases == '')
                fd[i].activecases = 0;
            else
                fd[i].activecases = parseInt(fd[i].activecases.split(',').join(''));

            if (fd[i].serious == '')
                fd[i].serious = 0;
            else
                fd[i].serious= parseInt(fd[i].serious.split(',').join(''));

            if (fd[i].totalcasesper1mpop == '')
                fd[i].totalcasesper1mpop = 0;
            else
                fd[i].totalcasesper1mpop = parseInt(fd[i].totalcasesper1mpop.split(',').join(''));

            if (fd[i].deathper1mpop == '')
                fd[i].deathper1mpop = 0;
            else
                fd[i].deathper1mpop = parseInt(fd[i].deathper1mpop.split(',').join(''));

            if (fd[i].totaltests == '')
                fd[i].totaltests = 0;
            else
                fd[i].totaltests = parseInt(fd[i].totaltests.split(',').join(''));

            if (fd[i].testsper1mpop == '')
                fd[i].testsper1mpop = 0;
            else
                fd[i].testsper1mpop = parseInt(fd[i].testsper1mpop.split(',').join(''));

            if (fd[i].population == '')
                fd[i].population = 0;
            else
                fd[i].population = parseInt(fd[i].population.split(',').join(''));

            if (fd[i].continent == '')
                fd[i].continent = 'null';

        }

        for (var i = 0 ; i < fd.length;i++)
        {
            //number of mac connections in mysql was set 320 in order to handle number of rows
            if (! (fd[i].country.includes('Total') || fd[i].country.includes('null'))) // do not include records of totals
            sqljson.queryinsert('raw',fd[i]);
        }

        // console.log(fd[0]);
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});

