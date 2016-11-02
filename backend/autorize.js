'use strict'
var db = require('./common/db');
var testUser = {
    name: "Ivan",
    pass: "111",
    mail: "test@test.ru"
};
module.exports = function (mail, passwd) {
    db.users.find({'mail': mail}, " pass", function(err, ans){
        if(err){
            console.log("Попытка входа не удалась, попробуйте позднее. Ошибка " + err);
            return false;
        }
        if (ans.length == 0){
            console.log("Пользователь не зарегистрирован");
        } else if(passwd == ans.pass){
            console.log("Введен верный пароль");
            return true;
        }
        else return false;
    });
};