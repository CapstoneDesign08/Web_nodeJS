var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes/index');
var upload = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/upload', upload);

app.post('/upload', function (req, res, next) {
    var id = req.body.id;
    var play = req.body.play;
    //score test
    if (play == 1) {
        //dll compile
        /*process.exec(){
            errchk(err);
            //print result on console
            console.log("dll compile complete" + id);
        }*/
        //unity start
       // process.exec("C:\\Progra~1\\Unity\\Editor\\Unity.exe -projectPath \"C:\\Users\\hong\\Desktop\\DllTest\" -quit -batchmode -executeMethod WebGLBuilder.build", function (err, stdout, stderr) {
          //  errchk(err);

            //print result on console
        //    console.log(stdout);
        console.log("run complete user - " + id);
       // });
    }
    //web view test
    else if (play == 2) {
        /*
        process.exec(){        //dll compile
            errchk(err);
            //print result on console
            console.log("dll compile complete" + id);
        }
        //unity start
        process.exec("C:\\Progra~1\\Unity\\Editor\\Unity.exe -projectPath \"C:\\Users\\hong\\Desktop\\DllTest\" -quit -batchmode -executeMethod WebGLBuilder.build", function (err, stdout, stderr) {
            errchk(err);

            //print result on console
            console.log(stdout);
        */
            console.log("build complete user - " + id);
        }
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
