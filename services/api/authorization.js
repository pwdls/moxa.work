class authorization{
    work(req, res){
        res.send(
            JSON.stringify({
                result: 0,
                data: ''
            })
        );
    }
}

module.exports = new authorization();