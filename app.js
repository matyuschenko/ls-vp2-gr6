//Подключение express
const express = require('express');
const app = express();
// Подключение сторонних библиотек
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const valid = require('validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Подключение модулей
const db = require('./backend/common/db');
const autorize = require('./backend/autorize');
//Настройка сервера
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
app.use('/main', express.static(__dirname + '/build'));
app.set('views', './source/template/pages/');


//Routing index page
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.render('index');
});
app.post('/registration', (req, res) =>{
    if(db.create(req.body, 'users')){
        res.redirect('/');
    }else {
        res.json({status: 'Пользователь с таким e-mail уже зарегистрирован'});
    }
res.end();

})
app.post('/auth', function(req, res) {
    //требуем наличия логина и пароля в теле запроса
    if (!req.body.mail || !req.body.password) {
        //если не указан логин или пароль - сообщаем об этом
        return res.json({status: 'Укажите логин и пароль!'});
    }

    if(valid.isEmail(req.body.mail)){
        if(valid.isAlphanumeric(req.body.password, 'en-US')) {
            var newAns = {};
            db.users.findOne({'mail': req.body.mail}, "mail password _id", function (err, ans) {
                if (ans !== null) {
                    if (req.body.mail !== ans.mail || req.body.password !== ans.password) {
                        return res.json({status: 'Логин и/или пароль введены неверно!'});
                    } else {
                        //если найден, то делаем пометку об этом в сессии пользователя, который сделал запрос
                        req.session.isReg = true;
                        req.session._id = ans._id;
                        req.session.save(function () {
                            res.send({redirect: '/main/:' + req.session._id});
                        });
                    }
                }
            })
        }
    }
});
app.get('/main/:_id', isAuth, function (req, res) {
    db.users.findOne({'_id': req.session._id}, "name avatarPath vk fb gl tw mail description", function (err, ans) {
        res.render('main', ans);
    });

});
app.get('/test', function(req, res){
    res.redirect("http://ya.ru");
});
app.get('/albums/:_id', loadUser, function (req, res) {
    res.render('album');
});

// app.get('/main', isAuth, function(req, res){
//     res.render('main');
// });
app.post('/edituser', function(req, res){
   if(req.session._id){
       db.set(req.session._id, req.body, 'users'); // set принимает объект
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

function isAuth (req, res, next) {
    if (!req.session.isReg) {
        return next("Вы не авторизованы");
    }
    next();
}
function loadUser(req, res){
    console.log("Загрузка юзера");
    if(req.session.userMail){
        console.log("Юзер есть в сессии " + req.session.userMail);
    }
}
