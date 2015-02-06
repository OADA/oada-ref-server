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

var Database = (function(resources) {

    var objectAssign = require('object-assign');

    resources = objectAssign({}, resources || {});

    var _save = function(_id, data, callback) {
        //Save this resource into our database
        //TODO support posting to children elements by /_id/child/child/
        resources[_id] = objectAssign(resources[_id] || {}, data);
        if (typeof(callback) == 'function') {
            callback();
        }
    };

    var _get = function(_id, view, callback) {
        //Returns resource with _id

        if (view === null) {
            console.log('No view supplied.');
            callback(resources[_id]);
            return;
        }

        //Must check view for hidden elements, ie. (_id and _meta)
        //Try to optimize for view as much as possible.
        //Change view if you do optimizations.
        var obj = resources[_id];

        if (typeof(view._id) == 'boolean' && view._id === true) {
            //TODO this is just a hack for now...
            //Turn on id
            obj._id = _id;
        }

        callback(obj);
    };

    var _delete = function(_id, callback) {
        if ((delete resources._id) === false) {
            callback('Could not delete resource ' + _id);
        } else {
            callback();
        }
    };

    return {
        save: _save,
        get: _get,
        delete: _delete
    };
})();

module.exports = Database;
