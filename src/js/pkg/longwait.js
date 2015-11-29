var Bluebird = require('bluebird'),
    Storage = require('../storage.js');

var LongWait = function () {};

LongWait.prototype.optionChangeHandler = function (e) {
    return Storage.set(e.target.name, e.target.checked);
};

LongWait.prototype.inputHandler = function (e) {
    return new Bluebird(function (resolve, reject) {
        setTimeout(function () {
            resolve([]);
        }, 1500);
    });
};

module.exports = LongWait;
