var gm = require('gm');
var Pictures = AppRequire('Collection/Pictures');
var File = TangoRequire('Modules/FileSystem/File');

function scaleSize(w, h, max)
{
    log(arguments);
    var ratio = w/ h, nw = 0, nh = 0; // width/height
    if( ratio > 1) {
        nw = max;
        nh = max/ratio;
    }
    else {
        nw = max*ratio;
        nh = max;
    }
    return [nw, nh];
}

var PictureService = function()
{
    var self = this;
    var pics = new Pictures();
    pics.getQuery().where('active', '=', 1);

    self.getRandom = function(page)
    {
        page--;
        var p = page || 0;
        var total = 24;
        pics.getQuery().limit(total, p*total).orderBy('rand()');
        return pics.findAll();
    };
    self.getById = function(id)
    {
        return pics.find(id);
    };
    self.generateImage = function (picture, size, pathNewImage)
    {
        var path = pathNewImage + picture.get('pictureId') + '.jpg';
        var file = picture.getFile();
        var image = new File(path);

        if(image.exists())
        {
            return image.read()
        }

        return new Promise(function(resolve, reject)
        {
            var realWidth = picture.get('width');
            var realHeight = picture.get('height');
            var sizes = scaleSize(realWidth, realHeight, size);

            gm(file.getPath()).thumb(sizes[0], sizes[1], path, 100, function(err, stdout, stderr, command)
            {
                if(err)
                {
                    reject(err);
                }

                var image = new File(path);
                image.read().then(resolve);
            });
        })


    };
};

module.exports = PictureService;
