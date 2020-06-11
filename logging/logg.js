fs = require('fs');
dat = require('./date')
const express = require('express');

function log (s) {
    let date_ob = new Date();


   let  t = dat.nowFull();
   let fname = dat.nowPartial();

    fs.appendFile(__dirname + ' ' +  fname +'.log', t + ": " + s + "\n", function (err) {
        if (err) return console.log(err);
    });
}

module.exports = {log};