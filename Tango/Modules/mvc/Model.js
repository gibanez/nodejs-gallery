var Model = function (data) {
    var self = this;
    self.data = data;

    self.set = function(name, value)
    {
        self.data[name] = value;
        return self;
    }
    self.get = function(name, _default)
    {
        var def = _default  || null;

        self.data[name]  || def;
    }
    self.has = function(name)
    {
        return
    }

    return self;
}



module.exports = Model;
