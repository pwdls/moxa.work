const {ClickHouse} = require("clickhouse");

const clickhouse = new ClickHouse({
    url: 'http://95.216.186.36',
    port: 8123,
    debug: false,
    basicAuth: null,
    isUseGzip: false,
    format: "json", // "json" || "csv" || "tsv"
    raw: false,
    config: {
        session_id                              : 'session_id if neeed',
        session_timeout                         : 60,
        output_format_json_quote_64bit_integers : 0,
        enable_http_compression                 : 0,
        database                                : 'my_database_name',
    },
    reqParams: {}
});

let query = "show databases;";

clickhouse.query(query).exec(function (err, rows) {
console.log(rows);
});