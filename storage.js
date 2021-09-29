require("dotenv").config();
const fs = require("fs");
const path = require("path");
const e = require("express");
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function main() {
    readDir(process.env.midl_dir)
        .then(result => Promise.all(result))
        .then(result => result.flat(2).map(val => readFileData(val)))
        .then(result => Promise.all(result))
        .then(result => createArr(result))
        .then(result => result.map(val => approximation(val)))
        .then(result => Promise.all(result))
        .then(result => console.log(result))
        .catch(err => {
            console.log(err);
        })
}

function approximation(arr) {
    return new Promise((resolve, reject) => {
            let time = -1;
            let sample;
            let result = new Array();

            for (let k in arr) {
                if (time === -1) {
                    sample = arr[k];
                    time = k;
                }
                if (
                    (
                        (time != k)
                        && ((new Date(k) - new Date(time)) <= 2 * process.env.midl_timeout)
                        && arr[k] != sample
                    )
                    || sample === 9
                ) {
                    time = k;
                    sample = arr[k];
                    result[k] = arr[k];
                } else if (((new Date(k) - new Date(time)) > 2 * process.env.midl_timeout) && time != k && sample != 9) {
                    time = (new Date((new Date(time)).getTime() + 1000)).toISOString();
                    sample = 9;
                    result[time] = sample;
                }
            }
            resolve(result);
        }
    )
        ;
}

function createArr(arr) {
    let result = new Array();
    arr.forEach(val => {
        val.forEach((value, key) => {
            if (result[key] === undefined) result[key] = new Array();
            result[key][value.time] = value.status;
        });
    });
    return result;
}

function readFileData(file) {
    return new Promise((resolve, reject) => {
        fs.stat(file, (err, stats) => {
            if (err) reject(err);
            if (stats.isFile() == false) resolve();
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) reject(err);
                let result = new Array();
                data = JSON.parse(data);
                data.properties.forEach(value => {
                    let str = path.basename(file, '.json');
                    str = str
                        .replaceAt(13, ':')
                        .replaceAt(16, ':')
                        .replaceAt(19, '.');
                    if(value.inStatus !== undefined)
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