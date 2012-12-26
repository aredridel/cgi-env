/*jshint indent:4 undef:true node:true */
"use strict";

var url = require('url');

module.exports = {
    createEnvironment: function createEnvironment(req) {
        var reqUrl = url.parse(req.url);
        var env = {
            PATH_INFO: reqUrl.pathname,
            SERVER_PROTOCOL: "HTTP/" + req.httpVersionMajor + "." + req.httpVersionMinor,
            SERVER_SOFTWARE: "Node/" + process.version,
            REQUEST_METHOD: req.method,
            QUERY_STRING: reqUrl.query || ''
        };

        for (var header in req.headers) {
            env['HTTP_' + header.replace('/-/g', '_').toUpperCase()] = req.headers[header];
        }

        if ('content-length' in req.headers) env.CONTENT_LENGTH = req.headers['content-length'];
        if ('content-type' in req.headers) env.CONTENT_TYPE = req.headers['content-type'];
        if ('authorization' in req.headers) env.AUTH_TYPE = req.headers.authorization.split(' ')[0];

        return env;
    }
};
