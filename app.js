var autorize = require('./backend/autorize');
var express = require('express');
var app = express();

//
app.set('view engine', 'pug');
app.use(express.static('./build'));
app.set('views', './source/template/pages/');
//Routing index page
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/logout', function (req, res) {
    res.render('index');
});
app.get('/user/:id', function (req, res) {
    res.render('main');
});

app.get('/albums/:id', function (req, res) {
    res.render('album');
});

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/test', function(req, res){
    var testUser = {
        name: "Ivan",
        pass: "111",
        mail: "test@test.ru"
    };
    autorize(testUser.mail, testUser.pass);
    res.end();
});
//Listen port default 9000
app.listen(9000, function () {
    console.log('Server running port 9000. Paste to you browser http://localhost:9000');
});