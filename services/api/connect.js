const fs = require("fs");

class Connect {
    work(req, res) {
        fs.readFile(process.env.midl_path + "/log/status.txt", "utf8", function (err,data) {
            res.send(
                JSON.stringify({
                    result: 0,
                    data: {
                        typeEquipment: process.env.midl_typeEquipment,
                        status: data
                    }
                })
            );
        })
    }
}

module.exports = new Connect();