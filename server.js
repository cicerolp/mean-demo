var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var api = require('./routes/mongodb');
// var api = require('./routes/mysql');

var port = 3000;

var app = express();

// view engine
app.set('views', path.join(__dirname, 'client/dist/'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// set static folder
app.use(express.static(path.join(__dirname, 'client/dist/')));

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', api);

app.use(function (req, res) {
    res.sendFile(__dirname + '/client/dist/index.html');
});

app.listen(port, function () {
    console.log('Server started on port: ' + port);
})