var Model = function (data) {
    var self = this;
    self.data = data;
    var relations = [];

    self.set = function(name, value)
    {
        self.data[name] = value;
        return self;
    }
    self.get = function(name, _default)
    {

        var dataRel = relations[name];
        if(dataRel)
        {

            var Collection = AppRequire('Collection/' + dataRel.use);

            console.info(Collection.toString(), dataRel.use);

            var key =dataRel.key;

            var collection = new Collection();
            collection.getQuery().where(key, '=', self.get(key));

            if(dataRel.type == 'hasMany')
            {
                return collection.findAll();
            }

            return new Promise(function(resolve, reject)
            {
                resolve([]);
            });
        }
        return self.data[name]  || _default;
    }
    self.has = function(name)
    {
        return
    }
    
    self.addHasMany = function (name, collection, key)
    {
        relations[name] = {type:'hasMany', 'use':collection, key:key};
    }

    return self;
}



module.exports = Model;
