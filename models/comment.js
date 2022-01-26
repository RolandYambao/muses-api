require('dotenv').config();
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
});

const Comment = mongoose.model('User', commentSchema);

module.exports = Comment;