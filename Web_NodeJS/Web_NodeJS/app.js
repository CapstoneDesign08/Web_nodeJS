var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var Q = require('Q');
var mysql = require('mysql');

var routes = require('./routes/index');
var users = require('./routes/users');
var uploader = require('./routes/uploader');
var mysql = require 
var app = express();

//multer uploader
var upload = function (req, res) {
    var deferred = Q.defer();
    var dllPath = "upload"; 
    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function (req, file, cb) {
            cb(null, dllPath);
        },

        // 서버에 저장할 파일 명
        filename: function (req, file, cb) {
            file.uploadedFile = {
                name: "MyAssembly",
                ext: "cs"
            };
            cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
        }
    });

    var upload = multer({ storage: storage }).single('myfile');
    upload(req, res, function (err) {
        if (err) deferred.reject();
        else deferred.resolve('Upload Complete');
    });
    return deferred.promise;
};
/*
//sql connector
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'hong8826',
    database: 'unitytest'
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({limit:'10mb', extended: false}));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


//app.use
app.use('/', routes);
app.use('/users', users);
app.use('/uploader', uploader);

//multer uploader start
app.post('/uploader', function (req, res, next) {
    upload(req, res).then(function (file) {
        res.json(file);
        console.log(req.file); //form files

    }, function (err) {
        res.status(500).send(err);
    });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
    
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
