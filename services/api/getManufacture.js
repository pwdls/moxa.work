class getManufacture {
    work(req, res) {
        res.send(
            JSON.stringify({
                "result": 0,
                "data": {
                    "dateFrom": "2013-11-08T10:11:31+03:00",
                    "dateTo": "2013-11-09T10:11:31+03:00",
                    "step": "day",
                    "inName": ["DI01", "DI02"],
                    "arData": [{
                        "DI01": [{
                            "2013-11-08T00:00:00+03:00": 21.4
                        },
                            {
                                "2013-11-09T00:00:00+03:00": 6.5
                            }
                        ]
                    },
                        {
                            "DI02": [{
                                "2013-11-08T00:00:00+03:00": 14.2
                            },
                                {
                                    "2013-11-09T00:00:00+03:00": 9
                                }
                            ]
                        }
                    ]
                }
            })
        );
    }
}

module.exports = new getManufacture();