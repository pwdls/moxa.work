require("dotenv").config();

exports.do = function (response, userStatus){
    let result = {
        "typeEquipment": process.env.midl_nameEquipment,
        "userStatus": userStatus,
        "properties": []
    };

    response.io.di.forEach(function (elem){
        result.properties.push({
            "inName": elem.diIndex,
            "inStatus": elem.diStatus
        });
    });
    return result;
}
