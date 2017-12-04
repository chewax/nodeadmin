var should = require('should');
var db = require('../lib/config/database');

describe("Initialization",function(){

    it('Should expose an init function', function(done){
        db.init.should.be.type("function");
        done();
    });

    it('Should expose an mongoose (mng) function', function(done){
        db.mng.should.be.type("function");
        done();
    });

    it('Should expose an connection (conn) function', function(done){
        db.conn.should.be.type("function");
        done();
    });

    it('Should raise an error if mongoose instance is undefined', function(done){
        db.init().should.be.instanceOf(Error);
        done();
    });

    it('Should raise error if mongoose instance is null', function(done){
        db.init({}).should.be.instanceOf(Error);
        done();
    });
    
});
