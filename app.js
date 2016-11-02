var autorize = require('./backend/autorize');
var valid = require('validator');
var express = require('express');
var db = require('./backend/common/db');
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

app.get('/login', function(req, res){
    // var mail = req.body.mail,
    //     pass =req.body.pass;
    var mail = 'test@test.ru',
        pass = '111';
    if(valid.isEmail(mail) && valid.isAlphanumeric(pass, 'en-US')){
        autorize(mail, pass);
        console.log('Пользователь залогинен');
    } else {
        console.log('Вы ввели неверные данные');
    }
    res.end();
});

app.post('/auth', function(req, res){
    // var user = {
    //     name: req.body.name,
    //     pass: req.body.pass,
    //     mail: req.body.mail
    // };

    var user = {
        name: "Ivan",
        pass: "111",
        mail: "test@mail.ru"
    };

    var data=new Array();
    if(valid.isEmail(user.mail)){
        if(valid.isAlphanumeric(user.name, 'en-US')){
            if(valid.isAlphanumeric(user.name, 'en-US')){
                db.users.find({'mail': user.mail}, "mail", function(err, ans){
                    if(ans.length == 0) {
                        var user = new db.users(user);
                        user.save(function (err) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log("true");
                                data["positive"]=true;
                            }
                        );
                    } else {
                        console.log("Пользователь с этим e-mail уже зарегистрирован");
                        data["error"] = "Пользователь с этим e-mail уже зарегистрирован";
                    }

                });
            }else{
                console.log("Пароль не соответствует требованиям");

                data["error"] = 'Пароль не соответствует требованиям';
            }

        }else{
            console.log('Неправильно введено имя');
            data["error"] = 'Неправильно введено имя';
        }
    } else{
        console.log("Неправильно введен e-mail");
        data["error"] = 'Неправильно введен e-mail';
    }
    res.send(data);
    res.end();
});
//Listen port default 9000

app.listen(9000, function () {
    console.log('Server running port 9000. Paste to you browser http://localhost:9000');
});