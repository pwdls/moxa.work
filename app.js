require("dotenv").config();
const express = require('express'),
    app = express();
const bodyParser = require('body-parser');

const apiController = require(process.env.midl_path + "/controllers/api.controller");
const protocol = process.env.midl_port === 443 ? "https" : "http";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.all('/api/v1', apiController.work);

app.listen(process.env.midl_port, process.env.midl_host, () => {
        console.log(`Server listens ${protocol}://${process.env.midl_host}:${process.env.midl_port}`);
    }
);