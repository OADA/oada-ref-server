var OADAServer = function(){

  var resources = null;

  var _rest = function(resources){
    var express = require('express')
    var app = express();
    var objectAssign = require('object-assign');

    resources = objectAssign({}, resources || {});

    app.configure(function(){
      app.set('port', process.env.PORT || 5000);
      app.use(express.bodyParser());
      app.use(express.methodOverride());
      app.use(app.router);
    });

    app.configure('development', function(){
      app.use(express.logger('dev'));
      app.use(express.errorHandler());
    });

    //Post resource
    app.post('/resources', function(req, res){
      resources["123"] = objectAssign(json[uri] || {}, obj);
      res.send({"_id": "123"});
    });

    //Put resource
    app.put('/resources:_id', function(req, res){
      var uri = req.params._id;
      var obj = req.body;
      resources[uri] = objectAssign(resources[uri] || {}, obj);
      res.sendStatus(200);
    });

    //GET resource
    app.get('/resources/:_id', function(req, res){
      var uri = req.params._id;
      if(resources[uri]) {
        res.send(resources[uri]);
      } res.sendStatus(404);
    });

    return app;
  }

  return {
    rest: _rest
  }
}();

module.exports = OADAServer;

