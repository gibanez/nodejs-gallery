var Collection = TangoRequire('Modules/mvc/Collection');
var Profile = AppRequire('Model/Profile')
var Profiles = function()
{
    var self = Collection.call(this, 'profiles');
    self.model = Profile;
    self.id = 'profile_id';
}

module.exports = Profiles;
