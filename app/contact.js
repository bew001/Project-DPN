var express = require('express');
var router = express.Router();
var  mysql = require('mysql');

router.get('/', function(req, res){
    console.log('/contact');
    let answer = "";
    answer = "<div style=\"padding: 30px;\n" +
        "  text-align: center;\n" +
        "  background-color: #474e5d;\n" +
        "  color: white;\">\n" +
        "  <h1 style=\"padding: 10px;\">Contact us</h1>\n" +
        "  <p style=\"font-size: 14px;\">Corona meters is run by a team of students with the goal of providing global COVID-19 statistics.<br> To know more, please contact us.</p>\n" +
        "</div>\n" +
        "\n" +
        "<h2 style=\"text-align:center; background-color: #FFFFFF; padding: 10px;\">Our Team</h2>\n" +
        "\n" +
        "<div class=\"row\">\n" +
        "  <div style=\"float: left; \n" +
        "  width: 48%;\n" +
        "  margin-bottom: 16px;\n" +
        "  padding: 0 8px;\">\n" +
        "    <div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); background-color: #FFFFFF; \n" +
        "  margin: 8px;\">\n" +
        "      <div style=\"padding:16px; text-align:center; \">\n" +
        "        <h2>Uma Lal</h2>\n" +
        "        <p style=\"color: grey;\">MAIA Student</p>\n" +
        "        <p>umamaria.laltrehanestrada@studentmail.unicas.it</p>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "\n" +
        "<div style=\"float: left; \n" +
        "  width: 48%;\n" +
        "  margin-bottom: 16px;\n" +
        "  padding: 0 8px;\">\n" +
        "    <div style=\"box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); background-color: #FFFFFF; \n" +
        "  margin: 8px;\">\n" +
        "      <div style=\"padding: 16px; text-align:center;\">\n" +
        "        <h2>Ali Taleb</h2>\n" +
        "        <p style=\"color: grey;\">MAIA Student</p>\n" +
        "        <p>alitaleb.hussein@studentmail.unicas.it</p>\n" +
        "      </div>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "\n" +
        "</div>";
    res.send(answer);
    res.end();

});

module.exports = router;