var Model = TangoRequire('Modules/mvc/Model');
var Album = function(data)
{
    var self = Model.call(this, data);
    self.manyToMany('pictures', 'Pictures', 'pictures_albums', 'album_id');
}

module.exports = Album;
