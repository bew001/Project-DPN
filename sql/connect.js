const express = require('express');
const log = require('../logging/logg');
const mysql = require('mysql');


const sql = createDBConnection();

function createDBConnection(){
    var out = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "coronadata"
    });
    log.log('odbc connection created');
    return out;
}

function close(){
    if (sql.state !== 'disconnected')
        sql.connect(function(err) {
            if (err) log.log(err) ;
            log.log("connection :" + sql.state);
        });
    else
        log.log("connection already closed");
}

function open(){
    if (sql.state === 'disconnected')
        sql.connect(function(err) {
            if (err) log.log(err) ;
            log.log("connection :" + sql.state);
        });
    else
        log.log("connection already open");

}
function queryfetch(s,res){
    sql.query(s,function (err,records,fields) {
        if (err)
            console.log(err);
        else
            //console.log(records);
        log.log(s);
        var answer = {
            result: 'OK',
            records: records
        }
        res.json(answer);
        res.end();

    })
};
function queryinsert(s){};
function querydelete(s){};
function queryupate(s){};

module.exports = {sql,open,close,queryfetch,queryinsert,querydelete,queryupate}