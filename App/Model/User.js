var Model = TangoRequire('Modules/mvc/Model');
var User = function(data)
{
    var self = Model.call(this, data);
    self.addHasMany('albums', 'Albums', 'user_id');
}

module.exports = User;
