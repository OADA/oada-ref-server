var Database = function(resources){

  var express = require('express')
  var objectAssign = require('object-assign');

  resources = objectAssign({}, resources || {});

  var _save = function(_id, data, callback){
    //Save this resource into our database
    //TODO support posting to children elements by /_id/child/child/
    resources[_id] = objectAssign(resources[_id] || {}, data);
    if(typeof(callback) == 'function') callback();
  }

  var _get = function(_id, view, callback){
    //Returns resource with _id

    if(view == null){
      console.log("No view supplied.");
      callback(resources[_id]);
      return;
    }

    //Must check view for hidden elements, ie. (_id and _meta)
    //Try to optimize for view as much as possible. Change view if you do optimizations.
    var obj = resources[_id];

    if(typeof(view._id) == 'boolean' && view._id == true){ //TODO this is just a hack for now...
      //Turn on id
      obj._id = _id;
    }

    callback(obj);
  }

  var _delete = function(_id, callback){ 
    if(delete resources[_id] == false){
      callback("Could not delete resource " + _id);
    } else {
      callback();
    }
  }



  return {
    save: _save,
    get: _get,
    delete: _delete
  }
}();

module.exports = Database;

