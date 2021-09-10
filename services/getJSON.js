const http = require("http"),
    https = require("https");

exports.getJSON = function (options, onResult){
    let port = options.port === 443 ? https : http;
    let req = port.request(options, function (res){
        let output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk){
            output += chunk;
        });

        res.on('end', function (){
            let obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function (err){
        res.send('{"error": "' + err.message + '"}');
    });

    req.end();
};