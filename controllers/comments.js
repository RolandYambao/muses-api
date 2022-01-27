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
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
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

// Edit
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let commentIndex = Number(req.params.id);
    Comment.findByIdAndUpdate({
        content: req.body.content,
    }, { where: { id: commentIndex } })
        .then(function (response) {
            console.log('Edited Comment', response);
            res.json(response);
        })
        .catch(function (error) {
            console.log('ERROR', error);
            res.json('Error occured, please try again....');
        })
});

// Delete
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    let commentIndex = Number(req.params.id);
    Comment.findByIdAndDelete({ where: { id: commentIndex } })
        .then(function (response) {
            console.log('Comment Deleted', response);
            res.json(response);
        })
        .catch(function (error) {
            console.log('ERROR', error);
            res.render('404', { message: 'Update was not successful. Please try again.' });
        })
});

module.exports = router;