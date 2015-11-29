var Storage = require('../storage.js');
var Whine = function () {};

Whine.prototype.optionChangeHandler = function (e) {
    return Storage.set(e.target.name, e.target.checked);
};

Whine.prototype.inputHandler = function (e) {
    throw new WhineException();
};

var WhineException = function () {
    this.name = 'WhineException';
    this.message = 'Nothing is actually wrong. Carry on.';
}

WhineException.prototype.toString = function () {
    return this.message;
}

module.exports = Whine;
