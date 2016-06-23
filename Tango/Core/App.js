'use strict';
var express = require('express');

var App = function (port) {
    var self = this;
    self.routes = [];
    self.server = express();
    self.server.use(express.static('public'));
    self.port = port || 80;
    self.addRoute = function(uri, callback, method)
    {
        self.routes.push({uri:uri, callback:callback, method:method})
    };
    self.run = function ()
    {
        self.routes.forEach(function(route)
        {
            var method = route.method.toLowerCase();
            var callback = route.callback.split('@'), ctrl = callback[0],action = callback[1];
            try
            {
                var ClassCtrl = AppRequire('Controller/' + ctrl);
            }
            catch (e)
            {
                console.info(e);
                throw e;
            }

            //console.info(DBConection);


            self.server[method](route.uri, function(req, res)
                {
                    var objCtrl = new ClassCtrl(req, res);
                    objCtrl[action](req.params);
                }
            );

        }, self);




        /*
        self.server.get('*', function(req, res)
        {
            console.info(req.xhr);
            res.status(404).send('what???');
        });
        */


        self.server.listen(self.port, function ()
        {

            console.log('INIT SERVER: localhost:' + self.port);
        })
    };
};

module.exports = App;