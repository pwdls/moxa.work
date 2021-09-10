const fs = require("fs");
const config = JSON.parse(fs.readFileSync(__dirname + "/../config/config.json", "utf8"));

exports.data = function (now) {
    if(now === undefined) {
        now = new Date();
    }
    let dirName = config.server.dir + "/" + now.toISOString().substr(0, 10) +"/"
    let dirNameOrigin = config.server.dirOrigin + "/" + now.toISOString().substr(0, 10) +"/"

    return {
        "now": now,
        "dirName": dirName,
        "dirNameOrigin": dirNameOrigin,
        "fileName": dirName + now.toISOString().replace(/[:,.]/g,'-') + ".json",
        "fileNameOrigin": dirNameOrigin + now.toISOString().replace(/[:,.]/g,'-') + ".json",
        "config": config
    }
}