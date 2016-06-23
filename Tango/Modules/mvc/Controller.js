var Controller = function (req, res) {
    var self = this;
    self.request = req;
    self.response = res;
    self.db = myDB();
    return self;
}

module.exports = Controller;
