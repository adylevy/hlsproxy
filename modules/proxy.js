"use strict";

const express = require('express');
const router = express.Router();
const http = require('http');
const m3u8 = require('m3u8');


router.get('/', function (req, res) {

    let desiredUrl= req.query.url;
    let parser = m3u8.createStream();
    let prefix = desiredUrl.replace(new RegExp('master.m3u8$'), '');

    http.get(desiredUrl , res => res.pipe(parser));

    parser.on('item', function(item) {
        let uri = item.get('uri');
        if (!uri.startsWith('http')) {
            item.set('uri', `${prefix}/${uri}`);
        }
    });

    parser.on('m3u', function(m3u) {
        res.setHeader('Content-Type','application/x-mpegURL');
        res.status(200).send(m3u.toString());
    });

});

module.exports = router;
