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
    create: function(options, base, callback){
        var that = this;
        var item = new that[base](options);
        item.save(callback);
        return true;
    },
    set: function(id, options, base){
        this[base].findById(id, function(err, ans){
            if(!err){
                for(var key in options){
                    ans[key] = options[key];
                }
                ans.save();
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
