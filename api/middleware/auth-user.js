'use strict'

const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Middleware to authenticate the request using Basic Authentication.
exports.authenticateUser = async (req, res, next) => {
    let message; // storing message to display

    const credentials = auth(req);
    // if credentials exist, find matching email address
    if (credentials) {
        const user = await User.findOne({
            where: { emailAddress: credentials.name }});
        if (user) { // if user successfully retrieved, compare passwords
            const authenticated = bcrypt
                .compareSync(credentials.pass, user.password);
            if (authenticated) { // if passwords match, assign current user to auth user
                console.log(`Authentication successful for email : ${user.emailAddress}`);

                req.currentUser = user;
            } else {
                message = `Authentication failure for email: ${user.emailAddress}`;
            }
        } else {
            message = `User not found for email address : ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
      } else {
        next();
      }

}