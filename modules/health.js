"use strict";

let express = require('express');
let router = express.Router();

const HEADER_CACHE_CONTROL = 'Cache-control';
const NO_CACHE = 'no-cache';

/* GET health page. */
router.get('/', function (req, res) {
    res.header(HEADER_CACHE_CONTROL, NO_CACHE);
    res.send("HLSProxy: OK");
});

module.exports = router;
