'use strict';

var _ = require('lodash');
var bcrypt = require('bcryptjs');
var config = require('../../config/config');
var customErr = require('./errors/custom_errors');

 /**
 * Generates a Random string of length == size
 * @param size
 * @returns {string}
 */
function randStr(size, allowDigits, allowCharacters) {
    
    if (typeof allowDigits == 'undefined' || allowDigits == null) allowDigits = true;
    if (typeof allowCharacters == 'undefined' || allowCharacters == null) allowCharacters = true;


    var text = "";
    var possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var possibleDigits = "0123456789";

    var possible = "";

    if (allowDigits) possible += possibleDigits;
    if (allowCharacters) possible += possibleChars;

    for( var i=0; i < size; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function isEmptyOrNil( value ) {
    return _.isNil(value) || _.isEmpty(value)
}

_.mixin({randomString: randStr});
_.mixin({isEmptyOrNil: isEmptyOrNil});

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

