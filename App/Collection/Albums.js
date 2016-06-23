var Collection = TangoRequire('Modules/mvc/Collection');
var Album = AppRequire('Model/Album');
var Albums = function()
{
    var self = Collection.call(this, 'albums');
    self.model = Album;
    self.id = 'album_id';
}

module.exports = Albums;
