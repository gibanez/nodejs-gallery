'use strict';
var db = {connect:'SI'};

global.log = function(data)
{
    console.log(data);
}

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
};
global.ROOT = __dirname;


var App = TangoRequire('Core/App');
var mysql = TangoRequire('Modules/DB/MySQL');

//var db = mysql.getInstance();

var app = new App();

app.watch('userId', function(req)
{
    return {a:1,b:2};
})

app.addRoute('/',       'MainCtrl@index', 'GET');
app.addRoute('/login',  'MainCtrl@login', 'GET');
app.addRoute('/logout', 'MainCtrl@logout', 'GET');


//PICTURES
app.addRoute('/picture/random/:page',       'PictureCtrl@random', 'GET');
app.addRoute('/picture/thumb/:id',          'PictureCtrl@thumb', 'GET');
app.addRoute('/picture/show/:id',          'PictureCtrl@show', 'GET');
app.addRoute('/picture',            'PictureCtrl@save', 'POST');

app.addRoute('/auth/login',     'UserCtrl@login', 'POST');
app.addRoute('/user',           'UserCtrl@query', 'GET');
app.addRoute('/user/:userId',   'UserCtrl@find', 'GET');
app.addRoute('/user',           'UserCtrl@save', 'POST');
app.addRoute('/user/:userId',   'UserCtrl@update', 'PUT');


mysql.connect().then(
    function(con)
    {
        db = con;

        app.run();
    })
