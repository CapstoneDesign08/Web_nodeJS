var express = require('express');
var router = express.Router();
var request = require('request');

// 헤더 부분
var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
}

// 요청 세부 내용
var options = {
    url: 'http://localhost:1337/upload',
    method: 'POST',
    headers: headers,
    form: { 'id': 1, 'play': 1, 'source' : 'cs' }
}


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    })
});

module.exports = router; 