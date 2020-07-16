const express = require('express');
const log = require('../logging/logg');
const mysql = require('mysql');


const sql = createDBConnection();

function createDBConnection(){
    var out = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "coronadata",
        multipleStatements: true
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
        console.log(records);
        res.json(answer);
        res.end();

    })
};
function queryinsert(s,res,f){
    sql.query(s,function (err,records,fields) {
        if (err){
            console.log(err);
            if (res!==undefined)
            res.send('fail');

        }
        else {
            console.log('success insert');
            log.log(s);
            if(res!==undefined)
            res.send('success');
            if(f!==undefined)
                f();
        }

    })
};

function querydelete(s){};
function queryupdate(s,res,redirect){
    sql.query(s,function (err,records,fields) {
        if (err){
            console.log(err);
            if(res!==undefined)
            res.send('fail');

        }
        else {

            log.log(s);
            if(res!==undefined)
                if(redirect!==undefined && redirect)
                    res.redirect('/');
                else
                    res.send('success');
        }

    })
};

function queryselect(s,res){
    sql.query(s,function (err,records,fields) {
        if (records.length < 1){
            if (res!==undefined)
            res.send('fail');

        }
        else {

            log.log(s);
            if (res!==undefined)
            res.send('success');
        }

    })
};
module.exports = {sql,open,close,queryfetch,queryinsert,querydelete,queryupdate,queryselect}