const express = require('express');
const passport = require('passport');
const router = express.Router();

const { Comment } = require('../models');

// Get Routes
router.get('/', function (req, res) {
    Comment.find()
        .then(comments => {
            res.json(comments)
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json('Error occured, please try again....');
        });
});

// Post Routes
router.post('/', function (req, res) {
    Comment.create({
        content: req.body.content,
    })
        .then(function (newComment) {
            newComment = newComment.toJSON();
            res.json(newComment);
        })
        .catch(function (error) {
            console.log('ERROR', error);
            res.json('Error occured, please try again....');
        });
});

module.exports = router;