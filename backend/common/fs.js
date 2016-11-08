'use strict'
const fs = require('fs');
const PATH = require('path');
var pathVar = './data/';
var name = 'user2';
module.exports = {
    createUserPath: function(name){
        var userPath = path + name;
        try {
            fs.mkdirSync(userPath);
            return userPath;
        } catch(err) {
            console.log('Папка уже существует');
            return err;
        }
    },
    createAlbumPath: function(userPath){
        var dir =  fs.readdirSync(userPath);
        try{
            var albumPath = userPath + dir.length;
            fs.mkdirSync(albumPath);
            return albumPath;
        } catch(err) {
            return err;
        }
    },
    addphoto: function (name, path, photoFile) {
        var dir = fs.readdirSync(path);
        try {
            var photoPath = path + dir.length + PATH.extname(name);
            fs.writeFileSync(photoPath, photoFile);
            return photoPath;
        } catch (err) {
            return err;
        }
    },
};