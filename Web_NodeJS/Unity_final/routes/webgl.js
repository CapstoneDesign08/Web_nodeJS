var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('/Users/hong/Desktop/TankTest_Grade/WebGL-Dist/index.html', { title: 'WebGL' });
    //res.render('index.html', { title: 'WebGL' });
    

});

module.exports = router;