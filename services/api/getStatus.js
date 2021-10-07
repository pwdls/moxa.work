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
       // let now = new Date();
        let dir = fileAndDirectory.getListDir(process.env.midl_dir + "/");
       // console.log(dir);
        return process.env.midl_dir + "/" + dir[0]["file"] + "/";
       // return process.env.midl_dir + "/" + now.toISOString().substr(0, 10) + "/"
    }
}

module.exports = new getStatus();