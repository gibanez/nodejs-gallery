var Controller = TangoRequire('Modules/mvc/Controller');
var Users = AppRequire('Collection/Users');

var UserCtrl = function (req, res)
{
    var self = Controller.call(this, req, res);
    self.find = function(params)
    {
        var users = new Users();
        users.find(params.userId).then(function(user)
        {

            user = user[0];

            console.info(1)

            user.get('albums').then(function(albums)
            {
                console.info(albums);

                user.data.albums = albums.map(function(album){return album.data});

                self.response.send(user.data);

            });


        });
    }

    self.save = function()
    {
        var users = new Users();
        var user = users.create(self.request.body);
        users.persist(user).then(function(data)
        {
            self.response.send([data]);
        });
        
    };

    self.update = function(params)
    {
        var users = new Users();

        var afterFind = function(user)
        {
            var user = user[0];
            var data = self.request.body;
            for(var k in data)
            {
                user.set(k, data[k]);
            }

            console.info(user);

            //self.response.send(user);

            users.persist(user).then(function(data)
            {
                self.response.send([data]);
            });
        };


        users.find(params.userId).then(afterFind);

        //self.response.send([]);
    }
};

module.exports = UserCtrl;