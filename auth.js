'use strict'

var http         = require('http');
var httpProxy    = require('http-proxy');
var cookieParser = require('cookie-parser');
var sessions     = require('client-sessions');
var bouncer      = require('heroku-bouncer');
var teamster     = require('teamster');
var os           = require('os');
var app          = require('express')();


var proxy = httpProxy.createProxyServer({ ws: true });


app.use(cookieParser(process.env.HEROKU_COOKIE_SECRET));

app.use(sessions({
  cookieName    : 'session',
  secret        : process.env.HEROKU_SESSION_SECRET,
  duration      : 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5,
  cookie        : {
    path     : '/',
    ephemeral: false,
    httpOnly : true,
    secure   : false
  }
}));

app.use(bouncer({
  oAuthClientID      : process.env.HEROKU_OAUTH_ID,
  oAuthClientSecret  : process.env.HEROKU_OAUTH_SECRET,
  encryptionSecret   : process.env.HEROKU_BOUNCER_SECRET
}));

app.use(function(req, res) {
  proxy.web(req, res, { target: 'http://localhost:59683'});
});

teamster.runServer(app, {
    numWorkers: process.env.NUM_WORKERS || os.cpus().length,
    port      : 59682,
    verbose   : true
});
