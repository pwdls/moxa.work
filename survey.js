require("dotenv").config();
const equipment = require(process.env.midl_path + "/equipment/" + process.env.midl_typeEquipment + "/index");

function survey (equipment){
    setTimeout(function (){
            equipment.do();
            survey(equipment);
    }, process.env.midl_timeout);
}

survey(equipment);