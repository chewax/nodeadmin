var should = require('should');
var model = require('../lib/modules/model/modelController');
var db = require('../lib/config/database');

var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();

// var Mockgoose = require('mockgoose').Mockgoose;
// var mockgoose = new Mockgoose(mongoose);

var _ = require('lodash');

// before(function(done) {
// 	mockgoose.prepareStorage().then(function() {
//         console.log("1");
//         done();
// 		// mongoose.connect('mongodb://localhost:27017/TestingDB', function(err) {
//         //     console.log("2");
//         //     if (_.isNil(err)) {
//         //         db.init(mongoose);
//         //     }

//         //     done(err);
//  		// });
//     });
//     // done();
// });

// describe("Model",function(){
    
//     it('Should expose an init function', function(done){
//         db.init.should.be.type("function");
//         done();
//     });
        
// }); 
