var Controller = TangoRequire('Modules/mvc/Controller');
var Users = AppRequire('Collection/Users');
var File = TangoRequire('Modules/FileSystem/File');

var MainCtrl = function (req, res)
{
    var self = Controller.call(this, req, res);

    self.index = function(req, res)
    {
        var file = new File('./App/view/index.html');
        file.read().then(function(data)
        {
            log('index');
            self.response.header('Content-Type', 'text/html');
            self.response.send(data);
        });
    };

    self.login = function(params)
    {
        var file = new File('./App/view/login.html');
        file.read().then(function(data)
        {
            self.response.send(data);
        });
    }

    self.logout = function()
    {
        self.response.send('logout');
    }
};

module.exports = MainCtrl;