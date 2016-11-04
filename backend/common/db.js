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
    create: function(options, base){
        for(var i = 0; i < options.length; i++){
            this[base].findOne({'_id': id}, function(err, ans){
                if(ans.length == 0){
                    for(var key in options[i]){
                        if(options[i].hasOwnProperty(key)) {
                            ans[key] = options[i][key];
                        }
                    }
                    return true;
                } else return false;
            });
        }
    },
    set: function(id, options, base){
        this[base].findOne({'_id': id}, function(err, ans){
            if(ans.length !== 0){
                for(var key in options){
                    if(options.hasOwnProperty(key)) {
                        ans[key] = options[key];
                    }
                }
                return true;
            } else return false;
        });
    },
    get: function(id, query, base){
        var promise = new Promise(function(res, rej){
            this[base].findOne({'_id': id}, function(err, ans){
                for(var key in query){
                    if(query.hasOwnProperty(key)) {
                        query[key] = ans[key];
                    }
                }
            });
            res(query);
        });
        return promise.then(function(query){
            return query;
        });
    },
};
