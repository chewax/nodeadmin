'use strict'

var _ = require('lodash');

module.exports = {init: init};

function init(opt, mongooseInstance) {
    
    var mng = mongooseInstance;
    mng.Promise = require('bluebird'); //Use bluebird...mongoose dont accept .catch

    //load database
    if (_.isEmpty(opt.dbuser) || _.isUndefined(opt.dbuser)){
        mng.connect('mongodb://' + opt.dbhost + '/' + opt.dbcoll);
    }
    else {

        var options = {
            db: { native_parser: true },
            server: { poolSize: 10 },
            user: opt.dbuser,
            pass: opt.dbpass,
            auth: {
                authdb: 'admin'
            }
        };

        var url = 'mongodb://'+opt.dbhost+':'+opt.dbport+'/'+opt.dbcoll;

        mng.connect(url, options);
    }
    
    var db = mng.connection;

    console.log("Connecting to Database...");

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
        console.log("Connection with Database success...");
    });

    exports.Mongoose = mng;
    exports.db = db;
}