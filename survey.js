require("dotenv").config();
const equipment = require(process.env.midl_path + "/equipment/" + process.env.midl_typeEquipment + "/index");

function survey(equipment) {
    setTimeout(function () {
        try {
            equipment.do();
            survey(equipment)
        } catch (e) {
            console.log(e)
        }
    }, process.env.midl_timeout);
}

survey(equipment);
