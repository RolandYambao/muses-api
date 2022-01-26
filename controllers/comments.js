const express = require('express');
const router = express.Router();

const { Comment } = require('../models');

// Get Routes
router.get('/', function (req, res) {
    Comment.find()
        .then(comments => {
            res.json({ comment: Object.assign(comments, {}) })
        })
        .catch(function (err) {
            console.log('ERROR', err);
            res.json({ message: 'Error occured, please try again....' });
        });
});

// Post Routes
router.post('/', function (req, res) {
    Comment.create({
        content: req.body.content,
    })
        .then(function (newComment) {
            newComment = newComment.toJSON();
            res.redirect('/gallery#comment');
        })
        .catch(function (error) {
            console.log('ERROR', error);
            res.render('404', { message: 'Comment was not added, please try again' });
        });
});

// Edit
router.put('/:id', function (req, res) {
    let commentIndex = Number(req.params.id);
    Comment.update({
        content: req.body.content,
    }, { where: { id: commentIndex } })
        .then(function (response) {
            console.log('Edited Comment', response);
            res.redirect('/gallery#comment');
        })
        .catch(function (error) {
            console.log('ERROR', error);
            res.render('404', { message: 'Update was not successful. Please try again.' });
        })
});

// Delete
router.delete('/:id', function (req, res) {
    let commentIndex = Number(req.params.id);
    Comment.destroy({ where: { id: commentIndex } })
        .then(function (response) {
            console.log('Comment Deleted', response);
            res.redirect('/gallery#comment');
        })
        .catch(function (error) {
            console.log('ERROR', error);
            res.render('404', { message: 'Update was not successful. Please try again.' });
        })
});

module.exports = router;