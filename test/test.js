/* Copyright 2014 Open Ag Data Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var expect = require('chai').expect;
var should = require('chai').should();
var supertest = require('supertest');
var request = supertest('http://127.0.0.1:9000'); //Pass URL or express app


describe('Chai tests.', function() {
  it('Test unordered array deep equal', function(done){
    expect({ array: [ { it:"one" }, { it:"two" } ]}).to.deep.equal({ array: [ { it:"two" }, { it:"one" } ]});
    done();
  });

  it('Test unordered array deep have members', function(done){
    expect([{ it:"one" }, { it:"two" } ]).to.deep.have.members([ { it:"two" }, { it:"one" } ]);
    done();
  });
});



describe('View Proposal Examples', function() {
  describe('Example Set 1', function() {

    var uploadedResource = {
      name: "Smith30",
      "acres": 30.3,
      "boundary": {}
    };

    var uploadedResId = null;

    before(function(done) {
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

    after(function(done) {
      request
        .post('/resources/' + uploadedResId)
        .set('X-HTTP-Method-Override', 'DELETE')
        .expect(200, done);
    });

    it('Question 1.1: returning a resource "un-messed-around-with"', function(done){
      request
        .get('/resources/' + uploadedResId)
        .expect(200)
        .expect(uploadedResource, done);
    });

    it('Question 1.2: returning a resources _id', function(done){
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


  describe('Example Set 2', function() {

    var uploadedResId = null;
    var fieldsList = { fields: [] };
    var fieldsExpanded = { fields: [] };

    before(function(done) {
      var fields = [
        {
          name: "Smith30",
          acres: 30.3,
          boundary: {}
        },
        {
          name: "Back40",
          acres: 42.8,
          boundary: {}
        }
      ];

      var uploadedField = function(field, error){
        fieldsList.fields.push({ _id: field._id });
        fieldsExpanded.fields.push(field);

        if(fieldsList.fields.length == fields.length){
          //Upload fields list
          request
            .post('/resources')
            .send(fieldsList)
            .expect(200)
            .end(function (err, res){
              if(err) return done(err);
              res.body.should.have.property('_id').and.to.be.a("string");
              uploadedResId = res.body._id;
              done();
            });
        }
      }

      fields.forEach(function(field) {
        request
          .post('/resources')
          .send(field)
          .expect(200)
          .end(function (err, res){
            if(err) return done(err);
            res.body.should.have.property('_id').and.to.be.a("string");
            field._id = res.body._id;
            uploadedField(field, err);
          });
      });
    });

    after(function(done) {
      //Delete all the resources I uploaded
      var numDeleted = 0;

      var deletedField = function(err){
        if(err) return done(err);

        numDeleted++;
        if(numDeleted == fieldsList.fields.length){
          //Delete fields list
          request
            .post('/resources/' + uploadedResId)
            .set('X-HTTP-Method-Override', 'DELETE')
            .expect(200, done);
        }
      }

      fieldsList.fields.forEach(function(field) {
        //Delete this field
        request
          .post('/resources/' + field._id)
          .set('X-HTTP-Method-Override', 'DELETE')
          .expect(200, deletedField);
      });
    });



    it('Question 2.1: expanding $each resource', function(done){
      request
        .get('/resources/' + uploadedResId)
        .expect(200)
        .expect(function(res){
          res.body.should.eql(fieldsExpanded);
        })
        .end(done);
    });


    it('Question 2.2: turning off keys in $each resource');

    it('Question 2.3: turning off keys with $others in $each resource');

    it('Question 2.4: filtering resources with $each and $regex');

    it('Question 2.5: filtering with multiple conditions; $gt and $regex');

    it('Question 2.6: filtering with the $or conditional as an object');

    it('Question 2.7: using the dot notation');

  });
  describe('Example Set 3 - Advanced cases', function() {
    
    it('Question 3.1: turning off/on keys while filtering');

    it('Question 3.2: turning off a key you are filtering on (the $view keyword)');

    it('Question 3.3: returning the _id key on a native array (_array)');

    it('Question 3.4: filtering without expansion. ($expand: false)');

  });
  describe('Example Set 4 - Advanced cases', function() {
    
    it('Question 4.1: using the $any keyword');

    it('Question 4.2: using the $every keyword');

    it('Question 4.3: filtering an array inside of an array');

  });
});
