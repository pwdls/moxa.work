require("dotenv").config();
const fs = require("fs");

class SMPO_Status {
    constructor() {
        fs.readFile(process.env.midl_path + '/equipment/' + process.env.midl_typeEquipment + '/config.json', 'utf8', (err, data) => {
            if(err) throw err;
            this.options = JSON.parse(data);
        });
    }

    getStatus() {
        fs.readFile('utf8',(err, data) => {
            if(err) throw err;
            return data;
        });
    }
}

exports.SMPO_Status = new SMPO_Status();