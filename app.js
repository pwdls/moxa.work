const fs = require('fs');
const config = JSON.parse(fs.readFileSync(__dirname + '/config/config.json','utf8'));

const express = require('express'),
    app = express();
const bodyParser = require('body-parser');

const apiController = require("./controllers/api.controller");

const host = config.server.host;
const port = config.server.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all('/api/v1', apiController.work);

app.listen(port, host, () => {
        console.log(`Server listens http://${host}:${port}`);
    }
);