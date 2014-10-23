var should = require('chai').should();
var supertest = require('supertest');
var request = supertest('http://127.0.0.1:9000'); //Pass URL or express app

describe('View Proposal Examples', function() {
  describe('Test', function() {
    it('errors if no /hello get route.', function(done){
        request
          .get('/hello')
          .expect(200)
          .expect("hello there.", done)
    });
    describe('Resources', function() {

      beforeEach(function(done) {
        request
          .get('/hello')
          .expect(200)
          .expect("hello there.", done);
      }); 

      it('errors if no /resources get route.', function(done){
          request
            .get('/resources')
            .expect(200)
            .expect("resources list", done)
      });
      it('errors if no /resources post route.', function(done){
          request
            .post('/resources')
            .expect(200)
            .expect({"_id": "123"}, done)
      });


    });
  });

  describe('Example Set 1', function() {

    var uploadedResource = {
      foo: {
        bar: 'hello world',
        baz: 7
      }
    };

    var uploadedResId = null;

    beforeEach(function(done) {
      request
        .post('/resources')
        .send(uploadedResource)
        .expect(200)
        .end(function (err, res){
          if(err) return done(err);
          res.body.should.have.property('_id').and.to.be.a("string");
          uploadedResId = res.body._id;
          done();
        });
    });      

    afterEach(function(done) {
      request
        .post('/resources/' + uploadedResId)
        .set('X-HTTP-Method-Override', 'DELETE')
        .expect(200, done);
    });

    it('Question 1.1: returns a resource "un-messed-around-with"', function(done){
      request
        .get('/resources/' + uploadedResId)
        .expect(200)
        .expect(uploadedResource, done);
    });

    it('Question 1.2: returns a resources _id', function(done){
      request
        .get('/resources/' + uploadedResId)
        .query({ view: '{"_id":true}' })
        .expect(200)
        .expect(function(res){
          res.body.should.have.property('_id').and.be.a("string");
        })
        .end(done);
    });

  });
});
