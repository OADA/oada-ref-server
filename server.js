var express = require('express')
var app = express();
var objectAssign = require('object-assign');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var errorhandler = require('errorhandler')
var morgan = require('morgan');

var env = process.env.NODE_ENV || 'development';
app.set('port', process.env.PORT || 9000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('X-HTTP-Method-Override'));


var rest = require('./rest');

app.use('/resources', rest.resources);

app.listen(app.get('port'), function(){
  console.log("Example API listening on port " + app.get('port') + ', running in ' + app.settings.env + " mode.");
});

if('development' == env) {
  app.use(morgan('dev'));
  app.use(errorhandler());
}