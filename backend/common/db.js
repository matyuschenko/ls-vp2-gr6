'use strict'
var schema = require('./db-schema');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photobook1');
module.exports = {
    users: mongoose.model('users', schema.usersSchema),
    albums: mongoose.model('albums', schema.albumsSchema),
    photos: mongoose.model('photos', schema.photosSchema),
    comments: mongoose.model('comments', schema.commentsSchema),
    tags: mongoose.model('tags', schema.tagsSchema),
    likes: mongoose.model('likes', schema.likesSchema),
    set: function(mail, options, base){
        this[base].findOne({'mail': mail}, function(err, ans){
            for(var key in options){
                if(options.hasOwnProperty(key)) {
                    ans[key] = options[key];
                }
            }
        });
    },
    get: function(mail, query, base){
        var promise = new Promise(function(res, rej){
            this[base].findOne({'mail': mail}, function(err, ans){
                for(var key in query){
                    if(query.hasOwnProperty(key)) {
                        query[key] = ans[key];
                    }
                }
            });
            res(query);
        });
        promise.then();

    },
};
