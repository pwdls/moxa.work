const fs = require("fs");
const processing = require("./processing");
const getWriteResult = require(process.env.midl_path + "/services/writeResult");
const getJSON = require(process.env.midl_path + "/services/getJSON");
const config = JSON.parse(fs.readFileSync(__dirname + "/config.json"), "utf8");
const getStaticData = require(process.env.midl_path + "/services/getStaticData");

exports.do = function () {
    let staticData = getStaticData.data(new Date());
    getJSON.getJSON(config.options, function (statusCode, response) {
        fs.readFile(process.env.midl_path_userStatus, "utf8", function (err, userStatus){
            let result = processing.do(response, userStatus);
            getWriteResult.writeResult(staticData.dirName, staticData.fileName, result);
            getWriteResult.writeResult(staticData.dirNameOrigin, staticData.fileNameOrigin, response);
        });
    });
}