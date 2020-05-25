const express = require('express');
const log = require('./logging/logg');
const sql = require('./sql/connect');
const bodyParser = require("body-parser");
const getRawData = require('./data/getRawData');
const listAction = require("./app/list.js"); //list of raw data

const port = 3000;

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use("/getRowdata", getRawData);
router.use("/listAction", listAction);

const app = express();
app.use(express.static('public'));
app.use(router);
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))