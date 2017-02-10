var express = require('express'); 
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var process = require('child_process');

var routes = require('./routes/index');
var upload = require('./routes/upload');
var webgl = require('./routes/webgl');
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
app.use('/webgl', webgl);

app.post('/upload', function (req, res, next) {
    var id = req.body.id;
    var play = req.body.play;
    fs.writeFileSync('C:\\Users\\hong\\Desktop\\visualstudioTest\\MyAssembly.cs', req.body.source, 'utf8');
    fs.writeFileSync('C:\\Users\\hong\\Desktop\\TankTest_Grade\\Assets\\Scripts\\Player\\Player_ID.cs', "using System.Collections;using System.Collections.Generic;using UnityEngine;public class Player_ID : MonoBehaviour{ public static int player_id = "+id+";}", 'utf8');
    console.log('FileSync completed');
    if (play == 1) {         //score test
        /* make dll
        process.exec("csc.lnk -target:library -out:C:\\Users\\hong\\Desktop\\visualstudioTest\\MyAssembly.dll -r:C:\\Progra~1\\Unity\\Editor\\Data\\PlaybackEngines\\WebGLSupport\\Managed\\UnityEngine.dll C:\\Users\\hong\\Source\\Repos\\Web_nodeJS\\Web_NodeJS\\Unity_final\\MyAssembly.cs", function (err, stdout, stderr) {         //dll compile
            errchk(err);
            //print result on console
            console.log("dll compile complete" + id);
        });*/
        //unity start
        process.exec("C:\\Progra~1\\Unity\\Editor\\Unity.exe -projectPath \"C:\\Users\\hong\\Desktop\\TankTest_Grade\" -batchmode -quit -buildWindows64Player C:\\Users\\hong\\Desktop\\TankTest_Grade\\test.exe", function (err, stdout, stderr) {
            errchk(err);
            console.log("run complete user - " + id);
            process.exec("start C:\\Users\\hong\\Desktop\\TankTest_Grade\\test.exe -batchmode -nographics", function (err, stdout, stderr) {
                errchk(err);
                console.log("Unity play fin");
            });
        });
    }
    else if (play == 2) {     //web view test
        //make dll
        //unity start
        process.exec("C:\\Progra~1\\Unity\\Editor\\Unity.exe -projectPath \"C:\\Users\\hong\\Desktop\\TankTest_Grade\" -batchmode -quit -executeMethod WebGLBuilder.build", function (err, stdout, stderr) {
            errchk(err);

            //print result on console
            console.log("build complete user - " + id);
        });
    }
});

var errchk = function errchk(err) {
    if (err != null)
        console.log(err);
}

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
