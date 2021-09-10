const getJSON = require("../../services/getJSON");
const fs = require("fs");
const config = JSON.parse(fs.readFileSync(__dirname + "/../../config/config.json", "utf8"));
config.eq = JSON.parse(fs.readFileSync(__dirname + "/config.json"), "utf8");

let options = config.eq.options;

exports.run = function () {
    getJSON.getJSON(options, function (statusCode, result) {
        let now = new Date();
        let dirName = now.toISOString().substr(0, 10) +"/";
        let fileName =now.toISOString().replace(/[:,.]/g,'-') + ".json";
        fs.stat(config.server.dir + dirName, function (err) {
            if (err){
                fs.mkdir(config.server.dir + dirName, function (){
                    fs.writeFile(config.server.dir + dirName + fileName, JSON.stringify(result), function (){});
                });
            } else {
                fs.writeFile(config.server.dir + dirName + fileName, JSON.stringify(result), function (){});
            }
        });
    });
}