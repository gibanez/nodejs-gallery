var Collection = TangoRequire('Modules/mvc/Collection');
var Picture = AppRequire('Model/Picture');
var Pictures = function()
{
    var self = Collection.call(this, 'pictures');
    self.model = Picture;
    self.id = 'pictureId';
};

module.exports = Pictures;
