'use strict'
var mongoose = require('mongoose');
// var usersSchema, albumsSchema, photosSchema, commentsSchema, tagsSchema, likesSchema;
module.exports = {
    usersSchema: new mongoose.Schema({
        name: String,
        pass: String,
        mail: String,
        vk: String,
        fb: String,
        gl: String,
        tw: String,
        backPath: String,
        avatarPath: String,
        description: String,
        regDate: Date,
        lastDate: Date
    }),
    albumsSchema: new mongoose.Schema({
        name: String,
        description: String,
        mainPhotoPath: String,
        backImagePath: String,
        user_ID: String
    }),
    photosSchema: new mongoose.Schema({
        name: String,
        description: String,
        date: Date,
        album_ID: String
    }),
    commentsSchema: new mongoose.Schema({
        user_ID: String,
        photo_ID: String,
        text: String,
        date: Date,
        recomment_ID: String
    }),
    tagsSchema: new mongoose.Schema({
        photo_ID: String,
        tag: String
    }),
    likesSchema: new mongoose.Schema({
        photo_ID: String,
        user_ID: String,
        date: Date
    })
};