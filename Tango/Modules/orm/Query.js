var Query = function(table)
{
    var self = this;
    self._where = [];
    self.table = table;

    var parseWhere = function (field, condition, value) {
        return field + condition + value;
    }

    self.where = function(field, condition, value)
    {
        self._where = [];
        self._where.push(parseWhere(field, condition, value));
        return self;
    }

    self.and = function(field, condition, value)
    {
        self._where.push('AND ' + parseWhere(field, condition, value));
        return self;
    }

    self.or = function(field, condition, value)
    {
        self._where.push('OR ' + parseWhere(field, condition, value));
        return self;
    }

    self.getSQL = function()
    {
        var sql = 'SELECT * FROM ' + self.table;

        if(self._where.length)
        {
            sql += " WHERE " + self._where.join(" ");
        }
        return sql;
    }



};

module.exports = Query;