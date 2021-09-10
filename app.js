const fs = require('fs');
const config = JSON.parse(fs.readFileSync(__dirname + '/config/config.json','utf8'));

const express = require('express'),
    app = express(),
    routes = require(__dirname + '/routes/index');
const bodyParser = require('body-parser');

const host = config.server.host;
const port = config.server.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', routes);

app.listen(port, host, () => {
        console.log(`Server listens http://${host}:${port}`);
    }
);
