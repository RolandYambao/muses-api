# Models

## `User` Model

### Imports
```js
require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
```

### `userSchema` and `User` Model

```js
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    timesLoggedIn: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', userSchema);
```

### Finished

```js
require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    timesLoggedIn: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```