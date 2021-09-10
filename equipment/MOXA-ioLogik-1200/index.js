const fs = require("fs");
const processing = require("./processing");
const getWriteResult = require("../../services/writeResult");
const getJSON = require("../../services/getJSON");
const config = JSON.parse(fs.readFileSync(__dirname + "/config.json"), "utf8");
const getStaticData = require("../../services/getStaticData");

exports.do = function () {
    let staticData = getStaticData.data(new Date())
    getJSON.getJSON(config.options, function (statusCode, response) {
        let result = processing.do(response);
        getWriteResult.writeResult(staticData.dirName, staticData.fileName, result);
        getWriteResult.writeResult(staticData.dirNameOrigin, staticData.fileNameOrigin, response);
    });
}