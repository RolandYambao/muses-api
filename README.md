# muses-api
This is the backend API of the Muses Center App located here: https://github.com/RolandYambao/muses-center

## Purpose:
The Muses Center is a MERN application showcasing an online museum where artists can post their artwork to be curated by the site administrator. The best works will be shown in a gallery where anonymous comments can critique the work.

## Technologies:
This MERN Application, as stated in its name, utilizes MongoDB (as the database), Express (for routes), React (as the framework), and Node.js. Other technologies include Axios and bycrypt used for fetching the API and authentication respectively.

## Development Approach:
The Muses Center was designed for specific features manifesting in their respective page. The Gallery Showcased the curated art with creatable anonymous comments, the portfolio showcases the CRUD functionality of portfolio pieces associated with each use, and the store simply has clickable buttons with props. All of this is wrapped around a particular sharp and simple aesthetic that mimics the serenity of a museum.

## Installation:
Firstly, fork and clone this repository and type "npm install" in the terminal upon opening this project, this will install all necessary dependencies to ensure its functionality. Create an .env file containing "MONGO_URI" with your mongo SRV placed as the link. Then add a "JWT_SECRET=" with whatever name you wish after the equal sign. Run it with "npm start" on the backend first then frontend.

## Code Snippets:
1. user Model - This is the Model for users signing up.
~~~js
require('dotenv').config();
const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    pictureUrl: String,
    title: String,
    description: String,
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    portfolio: [portfolioSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
~~~

2. users Controller - Showcasing the controller code of users
~~~js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const passport = require('passport');

const { User } = require('../models');

router.get('/test', (req, res) => {
    res.json({
        message: 'Testing users controller'
    });
});

router.post('/signup', async (req, res) => {
    // POST - adding the new user to the database
    // console.log('===> Inside of /signup');
    // console.log(req.body);

    User.findOne({ email: req.body.email })
        .then(user => {
            // if email already exists, a user will come back
            if (user) {
                // send a 400 response
                return res.status(400).json({ message: 'Email already exists' });
            } else {
                // Create a new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    portfolio: [],
                });

                // Salt and hash the password - before saving the user
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw Error;

                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.log('==> Error inside of hash', err);
                        // Change the password in newUser to the hash
                        newUser.password = hash;
                        newUser.save()
                            .then(createdUser => res.json(createdUser))
                            .catch(err => console.log(err));
                    });
                });
            }
        })
        .catch(err => {
            console.log('Error finding user', err);
            res.json({ message: 'An error occured. Please try again.' })
        })
});

router.post('/login', async (req, res) => {
    // POST - finding a user and returning the user
    // console.log('===> Inside of /login');
    // console.log(req.body);

    const foundUser = await User.findOne({ email: req.body.email });

    if (foundUser) {
        // user is in the DB
        let isMatch = await bcrypt.compare(req.body.password, foundUser.password);
        console.log('Match User', isMatch);
        if (isMatch) {
            // Updated timesLoggedin
            foundUser.timesLoggedIn += 1;
            foundUser.save();
            // if user match, then we want to send a JSON Web Token
            // Create a token payload
            // add an expiredToken = Date.now()
            // save the user
            const payload = {
                id: foundUser.id,
                email: foundUser.email,
                name: foundUser.name
            }

            jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                if (err) {
                    res.status(400).json({ message: 'Session has endedd, please log in again' });
                }
                const legit = jwt.verify(token, JWT_SECRET, { expiresIn: 60 });
                console.log('===> legit');
                console.log(legit);
                res.json({ success: true, token: `Bearer ${token}`, userData: legit });
            });

        } else {
            return res.status(400).json({ message: 'Email or Password is incorrect' });
        }
    } else {
        return res.status(400).json({ message: 'User not found' });
    }
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('====> inside /profile');
    console.log('====> user', req.user);
    const { id, name, email } = req.user; // object with user object inside
    res.json({ id, name, email });
});

router.get('/my-portfolio', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            const returnedUser = Object.assign(user, {});
            returnedUser.password = null;
            res.json({ user: returnedUser });
        })
});

router.get('/all-users', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find()
        .then(user => {
            const returnedUser = Object.assign(user, {});
            for (let i = 0; i < returnedUser.length; i++) {
                returnedUser.map(() => {
                    returnedUser[i].password = null;
                })
            }
            res.json({ user: returnedUser });
        })
});

router.post('/new-portfolio', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.portfolio.push(
                {
                    pictureUrl: req.body.pictureUrl,
                    title: req.body.title,
                    description: req.body.description,
                }
            )
            user.save(function (err) {
                if (!err) console.log('Success!');
                else {
                    console.log(err);
                }
            });
        })
});

router.put('/edit-portfolio', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.portfolio[Number(req.body.portfolioNumber) - 1] = {
                pictureUrl: req.body.pictureUrl,
                title: req.body.title,
                description: req.body.description,
            }
            user.save(function (err) {
                if (!err) console.log('Success!');
                else {
                    console.log(err);
                }
            });
        })
})

router.delete('/delete-portfolio', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.portfolio.splice(Number(req.body.portfolioData.portfolioNumber) - 1, 1)
            user.save(function (err) {
                if (!err) console.log('Success!');
                else {
                    console.log(err);
                }
            });
        })
})


module.exports = router;
~~~

3. comment Model - The model showcasing the anonymous comment critiques.
~~~js
require('dotenv').config();
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
~~~

4. comments Controller - The controller for said anonymous comment critiques
~~~js
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
~~~

## Routes
All Routes posted Above in the Code Examples

## Reflections:
I am proud of this project, for its simple yet beautiful appearance. The concept of the site is also quite utilitarian and unique, it is akin to an art portfolio website focused solely on competitiveness on making the best work.

## License
Distributed under the MIT License. See `LICENSE.md` for more information.