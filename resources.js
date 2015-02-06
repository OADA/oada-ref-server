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
'use strict';

var OADAServer = (function() {

    var express = require('express');
    var objectAssign = require('object-assign');

    var _resources = express.Router();

    var resources = {};

    _resources.get('/', function(req, res, next) {
        res.send('Cyrus test');
        next();
    });

    //Post resource
    _resources.post('/', function(req, res, next) {
        var uri = req.params._id;
        var obj = req.body;
        resources['123'] = objectAssign(resources[uri] || {}, obj);
        res.send({'_id': '123'});
        next();
    });

    //Put resource
    _resources.put('/resources/:_id', function(req, res, next) {
        var uri = req.params._id;
        var obj = req.body;
        resources[uri] = objectAssign(resources[uri] || {}, obj);
        res.sendStatus(200);
        next();
    });

    //GET resource
    _resources.get('/resources/:_id', function(req, res, next) {
        var uri = req.params._id;
        if (resources[uri]) {
            res.send(resources[uri]);
        } else {
            res.sendStatus(404);
        }
        next();
    });

    return {
        resources: _resources
    };

})();

module.exports = OADAServer;
