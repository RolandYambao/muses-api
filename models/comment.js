require('dotenv').config();
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;