var Controller = TangoRequire('Modules/mvc/Controller');
var PictureService  = AppRequire('Service/PictureService');
var gm = require('gm');
var fs = require('fs');
var File = TangoRequire('Modules/FileSystem/File');

var PictureCtrl = function (req, res)
{
    var self = Controller.call(this, req, res);
    var PicService = new PictureService();

    self.random = function(params)
    {
        PicService.getRandom(params.page).then(function(pictures)
        {
            res.send(pictures);
        });
    };

    self.thumb = function(params)
    {

        PicService.getById(params.id).then(function (picture)
        {
            var pathNewImage = ROOT + '/public/images/thumbs/';

            var max = (picture.get('width') > picture.get('height'))?180:135;

            PicService.generateImage(picture, max, pathNewImage).then(function(data)
            {
                self.response.header('Content-Type', 'image/jpg');
                self.response.send(data);
            }, self.responseError);

        }, self.responseError);
    };
    self.show = function (params) {
        PicService.getById(params.id).then(function (picture)
        {
            var pathNewImage = ROOT + '/public/images/generate/';
            PicService.generateImage(picture, 800, pathNewImage).then(function(data)
            {
                log(1);
                self.response.header('Content-Type', 'image/jpg');
                self.response.send(data);
            }, self.responseError);

        }, self.responseError);
    }

};

module.exports = PictureCtrl;