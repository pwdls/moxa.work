require("dotenv").config();
const fileAndDirectory = require(process.env.midl_path + "/services/fileAndDirectory");

class getStatus {

    constructor() {
        this.dir = this.getDirPath();
    }

    work(req, res) {
        fileAndDirectory.getContentsOfTheOldestFile(this.dir, res);
    }

    getDirPath() {
        let now = new Date();
        return process.env.midl_dir + "/" + now.toISOString().substr(0, 10) + "/"
    }

}

module.exports = new getStatus();