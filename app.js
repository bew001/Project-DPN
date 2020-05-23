const express = require('express');
const log = require('./logging/logg');
const sql = require('./sql/connect');
const getRawData = require('./data/getRawData')

const port = 3000;
sql.open();
sql.close();
const router = express.Router();
//router.use(bodyParser.urlencoded({ extended: false }));
router.use("/getRowdata", getRawData);

const app = express();
app.use(express.static('public'));
app.use(router);
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))