require("dotenv").config();
const fs = require("fs");
const path = require("path");

function main() {
    readDir(process.env.midl_dir)
        .then(result => readFiles(result), err => console.log(err))
        .then(() => {
            console.log();
        }, err => {
            console.log(err);
        })
}

function readFiles(dirList) {
    return new Promise((resolve) => {
        let result;
        dirList.forEach(val => {
            fs.readdir(val, (err, data) => {
                data.forEach(value => {
                    result[path.basename(val, '.json')] = fs.readFileSync(val + "/" + value, 'utf8');
                });
            });
        });
        resolve();
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
            resolve(dirList);
        });
    });
}

main();