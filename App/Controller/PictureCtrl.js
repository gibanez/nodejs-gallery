var PictureCtrl = function () {
    var self = this;

    self.query = function(req, res)
    {
        res.send("hola");
    }

    self.find = function(req, res)
    {
        res.send(req.params);
    }
}

module.exports = PictureCtrl;