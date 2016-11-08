const autorize = require('./backend/autorize');
const mongoose = require('mongoose');
const valid = require('validator');
const express = require('express');
const db = require('./backend/common/db');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    key: 'keys',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: null
    },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));



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

app.get('/albums/:id', loadUser, function (req, res) {
    res.render('album');
});

app.get('/', function (req, res) {
    res.render('index');
});


function isAuth (req, res, next) {
    if (!req.session.isReg) {
        return next("Вы не авторизованы");
    }
    next();
}

app.post('/auth', function(req, res) {
    //требуем наличия логина и пароля в теле запроса
    if (!req.body.mail || !req.body.password) {
        //если не указан логин или пароль - сообщаем об этом
        return res.json({status: 'Укажите логин и пароль!'});
    }
    if(valid.isEmail(req.body.mail)){
        if(valid.isAlphanumeric(req.body.password, 'en-US')) {
            db.users.findOne({'mail': req.body.mail}, "mail pass", function (err, ans) {
                if (ans.length !== 0) {
                    if (req.body.mail !== ans.mail || req.body.password !== ans.pass) {
                        return res.json({status: 'Логин и/или пароль введены неверно!'});
                    } else {
                        //если найден, то делаем пометку об этом в сессии пользователя, который сделал запрос
                        req.session.isReg = true;
                        req.session.mail = req.body.mail;
                        res.redirect('/main');

                    }
                }
            })
        }
    }
});
app.get('/main', isAuth, function(req, res){
    res.render('main');
});
app.post('/useredit', function(req, res){
   if(req.session.userMail){
       db.set(req.session.userMail, req.body, 'users'); // set принимает объект
   }
});
app.post('/albumedit', function(req, res){
    if(req.session.userMail){
        db.set(req.session.userMail, req.body, 'albums');
    }
});
app.post('/photoedit', function(req, res){
    if(req.session.userMail){
        db.set(req.session.userMail, req.body, 'photos');
    }
});
app.post('/albumcreate', function(req, res){
    if(req.session.userMail){
        db.create(req.session.userMail, req.body, 'albums');
    }
});
app.post('/photoadd', function(req, res){
    if(req.session.userMail){
        db.create(req.session.userMail, req.body, 'photos'); // create принимает массив объектов
    }
});


//Listen port default 9000

app.listen(9000, function () {
    console.log('Server running port 9000. Paste to you browser http://localhost:9000');
});
function loadUser(req, res){
    console.log("Загрузка юзера");
    if(req.session.userMail){
        console.log("Юзер есть в сессии " + req.session.userMail);
    }
}