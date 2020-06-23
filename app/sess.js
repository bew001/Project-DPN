var express = require('express');
var router = express.Router();



router.post('/',(req,res) => {
    let sess = req.session;

    console.log('session');
    //p1 is the function requested ( sign up , login , modify ) , p2 is the email , p3 is the password
    console.log(req.body.p1);
    if (req.body.p1 ==='get')
    {
        if(sess.loggedin == true) {
             res.send(sess.email);
        }
        else
         res.send('');
    }
    else if (req.body.p1==='set')
    {
        req.session.loggedin=true;
        req.session.email=req.body.p2;
        res.send('success');
    }
    else if (req.body.p1==='unset')
    {
        req.session.loggedin = false;
        req.session.email = '';
        res.send('success');
    }
    else
        res.send('error');

});


module.exports = router;
