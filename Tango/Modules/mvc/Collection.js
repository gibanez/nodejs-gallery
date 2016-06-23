var Query = TangoRequire('Modules/orm/Query');
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

                var models = [];
                data.forEach(function(d)
                {
                    models.push(new self.model(d));
                })

                resolve(models);
            });
        });
    }


    self.findAll = function(limit)
    {

        console.info(q.getSQL());

        var sql = 'SELECT * FROM ' + self.table;

        return query(sql, []);

    }
    self.find = function(id)
    {
        q.where(self.id, '=', id);
        var sql = q.getSQL();
        return query(sql, []);

    }

    self.getQuery = function()
    {
        return q;
    };
    self.getTable = function()
    {
        return self.table;
    };

    var q = new Query(self.table);
    console.info(self.getTable());

    return self;
}



module.exports = Collection;
