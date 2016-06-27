var Model = TangoRequire('Modules/mvc/Model');
var File = TangoRequire('Modules/FileSystem/File');
var Picture = function(data)
{
    var self = Model.call(this, data);

    self.getFile = function ()
    {
        var path = self.get('path') + '/' + self.get('filename');
        return new File(path);
    }
}

module.exports = Picture;
