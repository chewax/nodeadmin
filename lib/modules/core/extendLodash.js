'use strict';

var _ = require('lodash');
var bcrypt = require('bcryptjs');
var config = require('../../config/config');
var customErr = require('./errors/custom_errors');

_.mixin({

    hashPasswordAsync: function (pass) {

        return new Promise(function (resolve, reject) {

            bcrypt.genSalt(config.salt_work_factor, function (err, salt) {

                if (err) {
                    // Error Generating Salt
                    var e = new customErr.severeError("Error generating salt when creating user.");
                    reject(e);
                }


                // HASH
                bcrypt.hash(pass, salt, function (err, hash) {

                    if (err) {
                        // Error Hashing
                        var e = new customErr.severeError("Error hashing salted password.");
                        reject(e);
                    }

                    resolve(hash);

                });

            });
        });

    }

});


_.mixin({

    bcryptCompareAsync: function (sentPassword, loggedUser){

        return new Promise( function (resolve, reject) {

            // Compare retrieved password with sent password using salt.
            bcrypt.compare(sentPassword, loggedUser.credentials.password, function (err, isMatch) {

                if (err) {
                    var e = new customErr.severeError("Internal error comparing hashes.");
                    reject(e);
                }

                if (isMatch) {
                    resolve(loggedUser);
                }

                else {
                    var e = new customErr.notAuthorizedError("Wrong username or password.");
                    reject(e);
                }

            });
        });
    }

});

module.exports = _;

