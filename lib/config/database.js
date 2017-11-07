'use strict'

let _mng = {};
let _conn = {};

function init(mongooseInstance) {
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