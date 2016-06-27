var Controller = function (req, res) {
    var self = this;
    self.request = req;
    self.response = res;
    self.responseError = function (msg)
    {
        self.response.send({error:msg});
    }
    return self;
}

module.exports = Controller;
