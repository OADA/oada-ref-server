var OADAServer = function(){

  var express = require('express')
  var objectAssign = require('object-assign');
  
  var _resources = express.Router();

  _resources.get('/', function(req, res, next){
    res.send("Cyrus test");
    next();
  });

  //Post resource
  _resources.post('/', function(req, res, next){
    resources["123"] = objectAssign(json[uri] || {}, obj);
    res.send({"_id": "123"});
    next();
  });

  //Put resource
  _resources.put('/resources/:_id', function(req, res, next){
    var uri = req.params._id;
    var obj = req.body;
    resources[uri] = objectAssign(resources[uri] || {}, obj);
    res.sendStatus(200);
    next();
  });

  //GET resource
  _resources.get('/resources/:_id', function(req, res, next){
    var uri = req.params._id;
    if(resources[uri]) {
      res.send(resources[uri]);
    } else {
      res.sendStatus(404);
    }
    next();
  });

  return {
    resources: _resources;
  }
  
}();

module.exports = OADAServer;

