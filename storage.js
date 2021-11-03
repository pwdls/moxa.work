require("dotenv").config();
const fs = require("fs");
const path = require("path");

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
let fileName = process.env.midl_path_temp + '/' + GUID() + '.csv';
let files;
let DI_config = JSON.parse(fs.readFileSync(process.env.midl_path + '/config/DI_config.json'));

function main() {
    if (!fs.existsSync(fileName)) fs.open(fileName, 'w', err => {
        if (err) throw err;
    });
    readDir(process.env.midl_dir)
        .then(result => Promise.all(result))
        .then(result => {
            return files = result.flat(2)
        })
        .then(result => result.map(val => readFileData(val)))
        .then(result => Promise.all(result))
        .then(result => createArr(result))
        .then(result => result.map(val => approximation(val)))
        .then(result => Promise.all(result))
        .then(result => result.map((arr, key) => writeFile(arr, key)))
        .then(result => Promise.all(result))
        .then(() => deleteFiles())
        .catch(err => {
            console.log(err);
        })
}

function deleteFiles() {
    let file = files[0];
    files.shift();
    if (files.length > 0)
        files.forEach(val => {
            if (new Date(path.basename(file, 'json')) > new Date(path.basename(val, 'json'))) {
                fs.unlink(val, err => {if (err) throw err})
            } else {
                fs.unlink(file, err => {if (err) throw err});
                file = val;
            }
        });
}

function writeFile(arr, key) {
    arr.map((val) => {
        val.status = +(DI_config[key]['revers'] !== 1 && val.status);
          fs.appendFile(fileName, key + ";" + DI_config[key]['type'] +  ";\"" + val.time + "\";" + val.status + "\n", () => {
        });
    });
}

function GUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function approximation(arr) {
    return new Promise((resolve) => {
            let time = -1;
            let sample;
            let result = [];

            for (let k in arr) {
                if (time === -1) {
                    sample = arr[k];
                    time = k;
                }
                if (
                    (
                        (time !== k)
                        && ((new Date(k) - new Date(time)) <= 2 * process.env.midl_timeout)
                        && arr[k] !== sample
                    )
                    || sample === 9
                ) {
                    time = k;
                    sample = arr[k];
                    result.push({
                        'time': k,
                        'status': arr[k]
                    });
                } else if (((new Date(k) - new Date(time)) > 2 * process.env.midl_timeout) && time !== k && sample !== 9) {
                    time = (new Date((new Date(time)).getTime() + 1000)).toISOString();
                    sample = 9;
                    result.push({
                        'time': time,
                        'status': sample
                    });
                }
            }
            resolve(result);
        }
    );
}

function createArr(arr) {
    let result = [];
    arr.forEach(val => {
        val.forEach((value, key) => {
            if (result[key] === undefined) result[key] = [];
            result[key][value.time] = value.status;
        });
    });
    return result;
}

function readFileData(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if (err) reject(err);
            if (stats.isFile() === false) resolve();
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) reject(err);
                let result = [];
                data = JSON.parse(data);
                data.properties.forEach(value => {
                    let str = path.basename(file, '.json');
                    str = str
                        .replaceAt(13, ':')
                        .replaceAt(16, ':')
                        .replaceAt(19, '.');
                    if (value.inStatus !== undefined)
                        result[value.inName] = {
                            status: value.inStatus,
                            time: str
                        }
                });
                resolve(result);
            });
        });
    });
}

function readFiles(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) reject(err)
            files.forEach((val, key) => {
                files[key] = dir + '/' + val;
            });
            resolve(files);
        })
    })
}

function readDir(defaultDir) {
    return new Promise((resolve, reject) => {
        fs.readdir(defaultDir, (err, dirList) => {
            if (err) {
                reject(err);
            }
            dirList.forEach((val, key) => {
                dirList[key] = defaultDir + '/' + val;
            });
            resolve(dirList.map(value => readFiles(value)));
        });
    });
}

main();