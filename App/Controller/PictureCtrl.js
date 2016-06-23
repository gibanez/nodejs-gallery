var Controller = TangoRequire('Modules/mvc/Controller');

var PictureCtrl = function (req, res)
{
    var self = Controller.call(this, req, res);

    self.query = function(req, res)
    {
        res.send("hola");
    };

    self.find = function(params)
    {
        console.log(self.db);
        self.response.send(params);
    }
};

module.exports = PictureCtrl;