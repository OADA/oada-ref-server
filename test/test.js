var should = require('chai').should();
var supertest = require('supertest');
var request = supertest('http://localhost:5000'); //Pass URL or express app

describe('View Proposal Examples', function() {
  describe('Example Set 1', function() {

    var uploadedResource = {
      foo: {
        bar: 'hello world',
        baz: 7
      }
    };

    var uploadedResId = null;

    beforeEach(function(done) {
        it('errors if failed to post to resources'), function(){
          request
            .post('/resources')
            .send(uploadedResource)
            .expect(200)
            .end(function (err, res){
              if(err) return done(err);
              res.body.should.have.property.('_id').and.be.instanceof(String);
              uploadedResId = res.body._id;
              done();
            });
        });
      });
    });
      

    afterEach(function(done) {
        it('errors if failed to post to resources'), function(){
          request
            .post('/resources/' + uploadedResId)
            .set('X-HTTP-Method-Override', 'DELETE')
            .expect(200, done);
        });
      });
    });


    it('Question 1.1: returns a resource "un-messed-around-with"'), function(done){
      request
        .get('/resources/' + uploadedResId)
        .expect(200)
        .expect(uploadedResource, done);
    }

    it('Question 1.2: returns a resources _id'), function(done){
      request
        .get('/resources/' + uploadedResId)
        .expect(200)
        .expect(function(res){
          res.body.should.have.property('_id').and.be.instanceof(String);
        })
        .end(done);
    }
  });
});
