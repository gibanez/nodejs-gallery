var Collection = TangoRequire('Modules/mvc/Collection');
var User = AppRequire('Model/User');
var Users = function()
{
    var self = Collection.call(this, 'users');
    self.model = User;
    self.id = 'user_id';
}

module.exports = Users;
