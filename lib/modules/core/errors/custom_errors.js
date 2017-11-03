(function () {
    'use strict';

    var messages = require('./../systemMessages');

    /**
     * Not Found Custom Error - Inherits from Error.
     * @param errorMessage String
     * @param [userMessage] String
     * @param [statusCode] int
     */
    module.exports.notFoundError = function (errorMessage, userMessage, statusCode) {
        this.constructor.prototype.__proto__ = Error.prototype;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = errorMessage;
        this.statusCode = typeof statusCode !== 'undefined' ?  statusCode : 404;
        this.userMessage = typeof userMessage !== 'undefined' ?  userMessage : messages.generic();
    };

    /**
     * Mild Custom Error - Inherits from Error.
     * @param errorMessage String
     * @param [userMessage] String
     * @param [statusCode] int
     */
    module.exports.mildError = function (errorMessage, userMessage, statusCode) {
        this.constructor.prototype.__proto__ = Error.prototype;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = errorMessage;
        this.statusCode = typeof statusCode !== 'undefined' ?  statusCode : 500;
        this.userMessage = typeof userMessage !== 'undefined' ?  userMessage : messages.generic();
    };

    /**
     * Severe Custom Error - Inherits from Error.
     * @param errorMessage String
     * @param [userMessage] String
     * @param [statusCode] int
     */
    module.exports.severeError = function (errorMessage, userMessage, statusCode) {
        this.constructor.prototype.__proto__ = Error.prototype;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = errorMessage;
        this.statusCode = typeof statusCode !== 'undefined' ?  statusCode : 500;
        this.userMessage = typeof userMessage !== 'undefined' ?  userMessage : messages.generic();
    };


    /**
     * User not found error
     * @param [statusCode] int
     */
    module.exports.userNotFound = function (statusCode) {
        this.constructor.prototype.__proto__ = Error.prototype;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = "User Not Found";
        this.statusCode = typeof statusCode !== 'undefined' ?  statusCode : 404;
        this.userMessage = messages.data.dontExist('User');
    };


    /**
     * Not Authorized error
     * @param errorMessage
     * @param [userMessage]
     */
    module.exports.notAuthorizedError = function (errorMessage, userMessage) {
        this.constructor.prototype.__proto__ = Error.prototype;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.message = errorMessage;
        this.statusCode = 401;
        this.userMessage = typeof userMessage !== 'undefined' ?  userMessage : messages.auth.notAuthorized();
    };

}).call(this);