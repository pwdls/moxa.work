const fs = require("fs");

exports.writeResult = function (dirName, fileName, result){
    fs.stat(dirName, function (err) {
        if (err){
            fs.mkdir(dirName, function (){
                fs.writeFile(fileName, JSON.stringify(result), function (){});
            });
        } else {
            fs.writeFile(fileName, JSON.stringify(result), function (){});
        }
    });
}