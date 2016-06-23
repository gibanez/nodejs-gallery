var Query = TangoRequire('Modules/orm/Query');
var Insert = TangoRequire('Modules/orm/Insert');
var Update = TangoRequire('Modules/orm/Update');

var Collection = function (table) {
    var self = this;
    self.db = myDB();
    self.table = table;


    var query = function(sql, bind)
    {
        return new Promise(function(resolve, reject)
        {
            self.db.query(sql, bind, function(err, data)
            {
               if(err)
               {
                   return reject(err);
               }

                if(data.OkPacket)
                {
                    return resolve(data.OkPacket);
                }

                var models = [];
                data.forEach(function(d)
                {
                    models.push(new self.model(d));
                })

                resolve(models);
            });
        });
    }

    var execute = function(sql, bind)
    {
        return new Promise(function(resolve, reject)
        {
            self.db.query(sql, bind, function(err, data)
            {
                if(err)
                {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    };

    self.findAll = function(limit)
    {
        var sql = 'SELECT * FROM ' + self.table;
        return query(sql, []);
    };
    self.find = function(id)
    {
        var sql = q.where(self.id, '=', id).getSQL();
        return query(sql, []);

    };
    self.create = function(data)
    {
        return new self.model(data  || {});
    };

    self.getQuery = function()
    {
        return q;
    };

    self.getTable = function()
    {
        return self.table;
    };

    self.persist = function(model)
    {
        var exec;
        if(model.data[self.id])
        {
            exec = new Update(self.table);
            exec.values(model.data);
            exec.where(self.id, '=', model.data[self.id]);
        }
        else
        {
            exec = new Insert(self.table);
            exec.values(model.data);
        }
        var sql = exec.getSQL();
        return execute(sql);
    }
    var q = new Query(self.table);
    return self;
}



module.exports = Collection;
