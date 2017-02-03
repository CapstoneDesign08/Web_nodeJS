var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//mysql connect
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'hong8826',
    database: 'unitytest'
});
/* GET home page. */
router.get('/', function (req, res) {
    var query = connection.query('select * from challenges', function (err, rows) {
        console.log(rows)
        res.render('index', { title: "Unity Test" , rows:rows })
    });

});

module.exports = router;