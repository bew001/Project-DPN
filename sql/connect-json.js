const express = require('express');
const log = require('../logging/logg');
const MysqlJson = require('mysql-json');
const sqlJson = new MysqlJson({
    host: "localhost",
    user: "root",
    password: "",
    database: "coronadata"
});



function close(){
    if (sqlJson.state !== 'disconnected')
        sqlJson.connect(function(err) {
            if (err) log.log(err) ;
            log.log("connection :" + sqlJson.state);
        });
    else
        log.log("connection already closed");
}

function open(){
    if (sqlJson.state === 'disconnected')
        sqlJson.connect(function(err) {
            if (err) log.log(err) ;
            log.log("connection :" + sqlJson.state);
        });
    else
        log.log("connection already open");

}
function queryfetch(s){};
function queryinsert(table,s){
    sqlJson.insert(table,s,function (err,response,request) {
        if (err)
            log.log('error 2565: ' + err + request);
        else
        {
            log.log(JSON.stringify(s));
            log.log(JSON.stringify(response));
            //return response.insertId;
        }
    })
};
function querydelete(s){};
function queryupate(s){};

module.exports = {sqlJson,open,close,queryfetch,queryinsert,querydelete,queryupate}