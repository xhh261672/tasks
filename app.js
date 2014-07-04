
/**
 * Module dependencies.
 */

var express = require('express');

// var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);
var settings = require('./settings');
var partials = require('express-partials');

var app = express();
var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.enable('trust proxy');
app.use(partials());
app.use(cookieParser());
app.use(session({
    secret: settings.cookieSecret,
    store: new MongoStore({
        db: settings.db
    })
}));
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.methodOverride());
// app.use(express.cookieParser('your secret here'));
// app.use(express.session());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  // app.use(express.errorHandler());
}

var routes = require('./routes');

var path = require('path');


app.locals.getURL = function(url) {
}


app.get('/', routes.index);
app.post('/save', routes.save);

app.get('/blog/:year/:month/:day/:title', function(req, res) {
    var fileName = 
    './public/announce/' + 
    req.params.year + '-' +
    req.params.month + '-' +
    req.params.day + '-' +
    req.params.title + '.md';
    fs.readFile(fileName, 'utf-8', function(err, data) {
        if (err) res.send(err);
        res.send(data);
    });
});

// error handle
app.get('*',function(req, res) {
    console.log("404");
    res.send(404, "Oops! No such the page");
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


