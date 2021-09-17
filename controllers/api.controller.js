class apiController {
    async work(req, res) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/json")

        switch (req.body.request) {
            case "getConnect":
                res.send(JSON.stringify({
                    result: 0,
                    data: {
                        "typeEquipment": "MOXA-ioLogik-1200",
                        "userStatus": "Выключен"
                    }
                }));
                break;
            case "authorization":
                res.send(JSON.stringify({
                    result: 0,
                    data: {}
                }));
                break;
            default:
                res.send("{result:999}");
                break;
        }
    }
}

module.exports = new apiController();