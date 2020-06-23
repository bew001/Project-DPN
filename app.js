const express = require('express');
const log = require('./logging/logg');
const sql = require('./sql/connect');
const bodyParser = require("body-parser");
const getRawData = require('./data/getRawData');
const listAction = require("./app/list.js"); //list of raw data
const modelling = require("./app/model.js"); //Modelling
const healthInstructions = require("./app/healthInstructions.js"); //Health Instructions
const contact = require("./app/contact.js"); //Contact
const countryModel = require("./app/getCountryModel.js"); //getCountryModels
const session = require('express-session');
const sess = require('./app/sess');
const userlogin = require('./app/userlogin');
const app = express();

const port = 3000;

app.use(session({secret: 'aliuma',saveUninitialized: true,resave: true}));
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use("/getRowdata", getRawData);
router.use("/listing", listAction);
router.use("/model", modelling);
router.use("/healthInstructions", healthInstructions);
router.use("/contact", contact);
router.use("/getCountryModel", countryModel);
router.use("/sess", sess);
router.use("/userlogin", userlogin);



/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(router);
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))