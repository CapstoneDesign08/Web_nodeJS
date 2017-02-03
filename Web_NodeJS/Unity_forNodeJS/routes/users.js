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

/* GET users listing. */
router.get('/:challenge_id', function (req, res, next) {
    //res.send(req.params.id);
    res.render('users');
});

module.exports = router;