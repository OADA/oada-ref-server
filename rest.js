var REST = function(){

  var express = require('express')
  var objectAssign = require('object-assign');
  var database = require('./database');

  var _resources = express.Router();

  var postId = 122;

  //Get the resource list
  _resources.get('/', function(req, res, next){
    res.send("resources list");
  });

  //Get a resource
  _resources.get('/*', function(req, res, next){
    console.log("Getting resource with id: " + req.path.substr(1));

    var view = null;
    if(typeof(req.query.view) != 'undefined'){
      view = JSON.parse(decodeURI(req.query.view));
      console.log("View: " + JSON.stringify(view));
    }

    database.get(req.path.substr(1), view, function(obj, err){
      if(err || !obj) {
        res.sendStatus(404);
        return;
      }

      console.log("Got res:" + JSON.stringify(obj));
      res.json(obj);
    });
  });

  //Post resource
  _resources.post('/', function(req, res, next){
    console.log("Posting resource: " + JSON.stringify(req.body));
    //Send resource to database
    //TODO have database give back an id
    postId++;
    var _id = postId.toString();
    database.save(_id, req.body);
    res.send({"_id": _id});
  });


  //Delete resource
  _resources.delete("/*", function(req, res, next){
    console.log("Deleting resource with id: " + req.path.substr(1));
    //Delete resource in database
    database.delete(req.path.substr(1), function(err){
      if(err) {
        res.sendStatus(404);
      } else {
        res.sendStatus(200);
      }
    });
  });

  //TODO Put resource
  _resources.put('/:_id', function(req, res, next){
    console.log("Cyrus test 3:" + req.path);
    /*var uri = req.params._id;
    var obj = req.body;
    resources[uri] = objectAssign(resources[uri] || {}, obj);
    res.sendStatus(200);*/
    next();
  });

  return {
    resources: _resources
  }
}();

module.exports = REST;

