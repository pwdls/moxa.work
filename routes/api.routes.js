const express = require("express"),
    router = express.Router(),
    apiController = require("../controllers/api.controller");

router
    .route('/')
    .all(apiController.work);

module.exports = router;