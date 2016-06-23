var Controller = TangoRequire('Modules/mvc/Controller');
var Users = AppRequire('Collection/Users');

var PictureCtrl = function (req, res)
{
    var self = Controller.call(this, req, res);

    self.query = function(req, res)
    {
        res.send("hola");
    };

    self.find = function(params)
    {
        var users = new Users();
        users.find(params.id).then(function(user)
        {
            self.response.send(user[0]);
        });
    }

    self.save = function()
    {
        var users = new Users();
        var user = users.new(self.request.body);
        self.response.send(user);

        users.persist(user);

    }
};

module.exports = PictureCtrl;