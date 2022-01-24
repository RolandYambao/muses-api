# MERN Authentication `Backend`

## What it includes

* Mongoose User schema and model
* Settings for the database
* Passport and passport-jwt for authentication
* JSON Web Token
* Passwords that are hashed with BCrypt

## Dependencies

```zsh
npm install bcryptjs cors dotenv express jsonwebtoken mongoose passport passport-jwt
```

This is a code along for MERN Auth Backend

Tasks:
- [x] Set up server
- [x] Test home route
- [x] Set up models folder and `index.js`
- [ ] Add a `.env` with your `MONGO_URI` and `JWT_SECRET`
```text
MONGO_URI=mongodb://localhost:27017/myApp
JWT_SECRET=thisismysecret
```
- [x] Set up `User` models

### `User` Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| _id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| timesLoggedIn | Number | used to track the amount of times a user logs in |
| date | Date | new Date() |
| __v | Number | Auto-generated |

- [ ] Make controllers folder and test `users/test` route
- [ ] Setup passport strategy
- [ ] Intialize passport and pass passport as arguemnt to config
- [ ] Make controllers and routes for users
   - [ ] `/signup`, `/login`, `/profile`
   - [ ] Test each one after completing it in Postman

| Controller/Config/Model | Links | Description |
| --- | --- | --- |
| `GET` `/`| [`/`](#) | The home route |
| `GET` `/users/test`| [`/test`](https://github.com/SEI-1025/mern-authentication-backend/blob/main/docs/users-controller.md#get-userstest-route) | A route to test the users controllers |
| `POST` `/users/signup`| [`/signup`](https://github.com/SEI-1025/mern-authentication-backend/blob/main/docs/users-controller.md#post-userssignup-route) | A route that allows a user to signup |
| `POST` `/users/login`| [`/login`](https://github.com/SEI-1025/mern-authentication-backend/blob/main/docs/users-controller.md#post-userslogin-route) | A route that allows a user to login |
| `GET` `/users/profile`| [`/profile`](https://github.com/SEI-1025/mern-authentication-backend/blob/main/docs/users-controller.md#get-usersprofile-route) | A route that returns the data for a user that's logged in |
| `passport`| [`passport`](https://github.com/SEI-1025/mern-authentication-backend/blob/main/docs/passport.md) | Passport authentication using JSON Web Token  |
| `User`| [`User`](https://github.com/SEI-1025/mern-authentication-backend/blob/main/docs/models.md#user-model) | User schema and model  |
| `index.js` | [`index.js`](https://github.com/SEI-1025/mern-authentication-backend/blob/main/docs/server.md) | Server file |