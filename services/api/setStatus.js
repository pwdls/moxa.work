require("dotenv").config();
const fs = require("fs");

class getStatus {
    work(req, res) {
        fs.writeFile(process.env.midl_path_userStatus, JSON.parse(req.body.data)["userStatus"], () => {
            res.send(
                JSON.stringify({
                    result: 0,
                    data: {
                        "typeEquipment": process.env.midl_typeEquipment,
                        "userStatus": req.body.data.userStatus
                    }
                })
            );
        });
    }
}

module.exports = new getStatus();