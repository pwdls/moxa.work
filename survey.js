const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config/config.json", "utf8"));
const equipment = require(__dirname + "/equipment/" + config.equipment.typeEquipment + "/index");

function survey (equipment){
    setTimeout(function (){
            equipment.do();
            survey(equipment);
    }, config.equipment.timeout);
}

survey(equipment);