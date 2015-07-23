(function (Winston) {
    var Whine = function () {};

    Whine.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
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

    Winston.Package.register('Whine', Whine);
})(Winston);
