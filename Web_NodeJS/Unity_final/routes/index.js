var express = require('express');
var process = require('child_process');

var router = express.Router();

router.get('/', function (req, res) {
    var id = 1;
        process.exec("C:\\Progra~1\\Unity\\Editor\\Unity.exe -projectPath \"C:\\Users\\hong\\Desktop\\DllTest\" -quit -batchmode -executeMethod WebGLBuilder.build", function (err, stdout, stderr) {
            if (err) {
                console.error(err);
                return;
            }

            //print result on console
            console.log(stdout);
            console.log("fin");
        });
    //console.log("output");
});

module.exports = router;