'use strict'

let _ = require('lodash');
let _mng = {};
let _conn = {};

/**
 * Init Module. Recieves a working instance of mongoose. 
 * The module will extract model information from that instance.
 * @param {*} mongooseInstance 
 */
function init(mongooseInstance) {
    
    if (_.isNil(mongooseInstance)) return new Error("Mongoose instance is undefined");
    if (_.isEmpty(mongooseInstance)) return new Error("Mongoose instance is empty");

    _mng = mongooseInstance;
    _mng.Promise = require('bluebird'); //Use bluebird...mongoose dont accept .catch
    _conn = _mng.connection;
}

function mng() {
    return _mng;
}

function conn() {
    return _conn;
}

module.exports = {
    init: init,
    mng: mng,
    conn: conn
};