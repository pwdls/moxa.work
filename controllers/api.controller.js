
class apiController {
    async work(req, res){

        console.log(req.body);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/json")

        switch (req.body.request){
            case "getConnect":
                let result = {
                    result: 0,
                    data: {
                        "typeEquipment": "MOXA-ioLogik-1200",
                        "userStatus": "Выключен"
                    }
                }
                res.send(JSON.stringify(result));
                break;
            default:
                res.send("{result:999}");
                break;
        }
    }
}

module.exports = new apiController();