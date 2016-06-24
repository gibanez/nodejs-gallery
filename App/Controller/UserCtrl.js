var Controller = TangoRequire('Modules/mvc/Controller');
var Users = AppRequire('Collection/Users');
var Albums = AppRequire('Collection/Albums');

var ORM = TangoRequire('Modules/orm/ORM');
var Query = ORM.Query;

var UserCtrl = function (req, res)
{
    var self = Controller.call(this, req, res);
    self.find = function(params)
    {
        var users = new Users();



        users.find(params.userId).then(function(user)
        {
            user.get('albums').then(function(albums)
            {
                log(2);
                user.get('profile').then(function(profile)
                {
                    self.response.send(user.data);
                });
            });
        });
    };

    self.save = function()
    {
        var users = new Users();
        var user = users.create(self.request.body);
        users.persist(user).then(function(data)
        {
            self.response.send([data]);
        });
    };

    self.query = function()
    {
        var albums = new Albums();
        albums.find(1).then(function(album)
        {
            album.get('pictures').then(function (pictures)
            {
                self.response.send(album);
            });
        });

        var q = new Query('users');
        q.leftJoin('profiles').on('user_id', '=', 'user_id');
        //self.response.send(q.getSQL());
    };

    self.update = function(params)
    {
        var users = new Users();
        var saved = function(data){self.response.send([data]);};
        var afterFind = function(user)
        {
            var user = user[0];
            var data = self.request.body;
            for(var k in data)
            {
                user.set(k, data[k]);
            }
            users.persist(user).then(saved);
        };
        users.find(params.userId).then(afterFind);
    }
};

module.exports = UserCtrl;