const fs = require("fs");

class fileAndDirectory {

    getListFile(dir) {
        return fs.readdirSync(dir)
            .filter(f => fs.lstatSync(dir + f).isFile())
            .map(file => ({file, mtime: fs.lstatSync(dir + file).mtime}))
            .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    }

    getListDir(dir) {
        return fs.readdirSync(dir)
            .filter(f => fs.lstatSync(dir + f).isDirectory())
            .map(file => ({file, mtime: fs.lstatSync(dir + file).mtime}))
            .sort((a, b) => a.mtime.getTime() - b.mtime.getTime());
    }

    getContentsOfTheOldestFile(dir, res) {
        let listFile = this.getListFile(dir);
        //console.log(dir + listFile[0]['file']);
        if (listFile.length) {
            fs.readFile(dir + listFile[0]['file'], 'utf8', (err, data) => {
                fs.readFile(process.env.midl_path_userStatus, 'utf8', (err, userStatus) => {
                    fs.readFile(process.env.midl_path + '/config/DI_config.json', 'utf8', (err, config) => {
                        if (err) throw err;
                        config = JSON.parse(config);
                        //   console.log(config);
                        data = JSON.parse(data);
                        //     console.log(data);
                        data.properties.forEach((val, key) => {
                            if (config[val.inName] !== undefined)
                                data.properties[key]["inName"] = config[val.inName]["name"];
                        });
                        data.userStatus = userStatus;
                        data.typeEquipment = process.env.midl_nameEquipment;
                        data.equipmentStatus = "Под нагрузкой";
                        return res.send(JSON.stringify(data));
                    });
                });
            });
        } else res.send('{"result":0, "data":""}');
    }

}

module.exports = new fileAndDirectory();