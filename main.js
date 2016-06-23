'use strict';
var db = {connect:'SI'};

global.AppRequire = function(name)
{
    return require(__dirname + '/App/' + name);
}
global.TangoRequire = function(name)
{
    return require(__dirname + '/Tango/' + name);
}

global.myDB = function()
{
    return db;
}

var App = TangoRequire('Core/App');
var mysql = TangoRequire('Modules/DB/MySQL');

//var db = mysql.getInstance();

var app = new App();
app.addRoute('/', 'PictureCtrl@query', 'GET');
app.addRoute('/picture/:id', 'PictureCtrl@find', 'GET');

mysql.connect().then(
    function(con)
    {
        db = con;
        app.run();
    })
