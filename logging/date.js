const express = require('express');


function nowFull () {
    let date_ob = new Date();

// current date
// adjust 0 before single digit date
    let day = ("0" + date_ob.getDate()).slice(-2);

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

    let t = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    return t;

}
function nowPartial () {
    let date_ob = new Date();

// current date
// adjust 0 before single digit date
    let day = ("0" + date_ob.getDate()).slice(-2);

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

    let partial = year + "-" + month + "-" + day;
    return partial;

}
function addDay (s) {
    let date_ob = new Date();

// current date
// adjust 0 before single digit date
    let day = ("0" + (date_ob.getDate() + s)).slice(-2);

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

    let t = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    return t;

}



module.exports = {nowFull,nowPartial,addDay};