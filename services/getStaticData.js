require("dotenv").config();

exports.data = function (now) {
    if(now === undefined) {
        now = new Date();
    }
    let dirName = process.env.midl_dir + "/" + now.toISOString().substr(0, 10) +"/"
    let dirNameOrigin = process.env.midl_dirOrigin + "/" + now.toISOString().substr(0, 10) +"/"

    return {
        "now": now,
        "dirName": dirName,
        "dirNameOrigin": dirNameOrigin,
        "fileName": dirName + now.toISOString().replace(/[:,.]/g,'-') + ".json",
        "fileNameOrigin": dirNameOrigin + now.toISOString().replace(/[:,.]/g,'-') + ".json",
    }
}