class getOperating {
    work(req, res) {

        let f = [
            12.1, 4.6, 6.5, 3.3, 1.3,
            16.2, 6.6, 3.6, 2.7, 1.6,
            5.6, 3.6, 6.2, 1.6, 4.5,
            21.2, 6.6, 7.6, 5.5, 2.9,
            3.5, 1.6, 8.2, 3.4, 8.4,
            2.1, 3.6, 5.6, 3.3, 6.3,
            2.3, 7.3, 4.3, 2.1, 7.7,
            21.2, 6.6, 7.6, 5.5, 2.9,
            3.5, 1.6, 8.2, 3.4, 8.4,
            2.1, 3.6, 5.6, 3.3, 6.3,
            2.3, 7.3, 4.3, 2.1, 7.7,
        ]
        let date = new Date();
        let day = date.getDate();
        let hour = date.getHours();

        let day1 = (new Date()).toISOString();
        let day2 = (new Date(Date.now() - 86400000)).toISOString();
        let day3 = (new Date(Date.now() - 2 * 86400000)).toISOString();
        let day4 = (new Date(Date.now() - 3 * 86400000)).toISOString();
        let day5 = (new Date(Date.now() - 4 * 86400000)).toISOString();


        let result = [
            {date: day1, value: +(f[day] * hour / 24).toFixed(1)},
            {date: day2, value:f[day + 1]},
            {date: day3, value:f[day + 2]},
            {date: day4, value:f[day + 3]},
            {date: day5, value:f[day + 4]}
        ];

        let foo = {
            result: 0,
            data: JSON.parse(JSON.stringify(result))
        };
        res.send(
            JSON.stringify(foo)
        );

    }
    }

    module
.
    exports = new getOperating();