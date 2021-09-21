const fs = require("fs");

class fileAndDirectory {

    getListFile(dir) {
        return fs.readdirSync(dir)
            .filter(f => fs.lstatSync(dir + f).isFile())
            .map(file => ({file, mtime: fs.lstatSync(dir + file).mtime}))
            .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    }

    getContentsOfTheOldestFile(dir, res){
        let listFile = this.getListFile(dir);
        //console.log(dir + listFile[0]['file']);
        if (listFile.length){
            fs.readFile(dir + listFile[0]['file'], 'utf8', (err, data) => {
               // console.log(data);
                return res.send(data);
            });
        } else res.send('{"result":0, "data":""}');
    }

}

module.exports = new fileAndDirectory();