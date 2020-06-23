var express = require('express');
var router = express.Router();
var sql = require('../sql/connect');
const { v4: uuidv4 } = require('uuid');
var nodemailer = require('nodemailer');




router.post('/',(req,res) => {
    //p1 is the function requested ( sign up , login , modify ) , p2 is the email , p3 is the password
    console.log(req.body.p1);
    if (req.body.p1 ==='login')
    {
        sql.queryselect("select id from credentials where password = '" + req.body.p3 + "' and email = '" + req.body.p2 +"' and verified=1;",res);
    }
        else if (req.body.p1==='signup')
    {
        let uuid = uuidv4();
        while (uuid.length<10)
        {}
        sql.queryinsert("insert into credentials (email,password) values ('" + req.body.p2 + "','" + req.body.p3 + "');",res,verificationMail(req.body.p2,uuid));

        sql.queryinsert("insert into verification (email,uuid) values ('" + req.body.p2 + "','" + uuid + "');");

    }
        else if (req.body.p1==='modify')
    {
        if(req.session.email!==req.body.p2)
            res.send("fail");
        else
            sql.queryupdate("update credentials set password = '" + req.body.p3 + "' where email = '" + req.body.p2 +"';",res);

    }
        else
        res.send('error');
});

router.get('/',(req,res) => {
    //p1 is the function requested ( sign up , login , modify ) , p2 is the email , p3 is the password
    console.log(req.query.p1);
    if (req.query.p1 ==='verify') {
        sql.queryupdate("update credentials inner join verification on credentials.email = verification.email set verified = 1 where credentials.email='" + req.query.p2 +"' and uuid='" + req.query.p3 +"';",res,true);
    }
    else
        res.send('error');
});

var transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: 'at-ms1@hotmail.com',
        pass: 'bew1989BEw'
    }
});

function verificationMail(email,uuid)
{
    var mailOptions = {
        from: 'at-ms1@hotmail.com',
        to: email,
        subject: 'Welcome to Our Project',
        html: "<h1>Welcome</h1><p>Please click <a href =\"http://localhost:3000\\userlogin?p1=verify&p2=" + email +"&p3=" +uuid + "\">here</a> to verify your account </p>"
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}






function test(){
    console.log('it worked');
}
module.exports = router;
