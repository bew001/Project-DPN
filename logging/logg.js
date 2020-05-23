fs = require('fs');
const express = require('express');

function log (s) {
    let date_ob = new Date();

// current date
// adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

// current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
    let year = date_ob.getFullYear();

// current hours
    let hours = date_ob.getHours();

// current minutes
    let minutes = date_ob.getMinutes();

// current seconds
    let seconds = date_ob.getSeconds();

   let  t = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
   let fname = year + "-" + month + "-" + date;

    fs.appendFile(__dirname + ' ' +  fname +'.log', t + ": " + s + "\n", function (err) {
        if (err) return console.log(err);
    });
}

module.exports = {log};