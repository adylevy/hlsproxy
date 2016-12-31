"use strict";

const http = require('http');
const express = require('express');
const proxy = require('./modules/proxy');
const health = require('./modules/health');
const path = require('path');
const app = express();

// cors
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use('/serve',proxy);
app.use('/health',health);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(6060);

