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