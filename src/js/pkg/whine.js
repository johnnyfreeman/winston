(function (Winston) {
    var Whine = function () {};

    Whine.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    Whine.prototype.inputHandler = function (e) {
        throw new Error('Whine package threw this (on purpose) from it\'s inputHandler');
    };

    Winston.Package.register('Whine', Whine);
})(Winston);
