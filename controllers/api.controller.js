class apiController {
    async work(req, res) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/json")
        try {
          //  console.log(req.body.request);
            let api = require(process.env.midl_path + "/services/api/" + req.body.request);
            api.work(req,res);
        }
         catch (e) {
            console.log(e);
            res.send("{result:999}");
        }

    }
}

module.exports = new apiController();