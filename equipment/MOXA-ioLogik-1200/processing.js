const getStaticData = require("../../services/getStaticData"),
    staticData = getStaticData.data();

exports.do = function (response){
    let result = {
        "typeEquipment": staticData.config.equipment.typeEquipment,
        "userStatus": "Выключен",
        "properties": []
    };

    response.io.di.forEach(function (elem){
        let foo;
        if(elem.diCounterValue || elem.diCounterValue === 0){
            foo = {
                "inName": elem.diIndex,
                "inMode": "counter",
                "inStatus": elem.diCounterValue
            };
        } else {
            foo = {
                "inName": elem.diIndex,
                "inMode": "On/Off",
                "inStatus": elem.diStatus
            }
        }
        result.properties.push(foo);
    });
    return result;
}
