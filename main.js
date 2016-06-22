'use strict';
global.AppRequire = function(name)
{
    return require(__dirname + '/App/' + name);
}
global.TangoRequire = function(name)
{
    return require(__dirname + '/Tango/' + name);
}

var App = TangoRequire('Core/App');



var app = new App();
app.addRoute('/', 'PictureCtrl@query', 'GET');


app.run();