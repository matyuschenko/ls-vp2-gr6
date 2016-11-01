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
    likes: mongoose.model('likes', schema.likesSchema)
};
