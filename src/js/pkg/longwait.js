(function (Winston) {
    var LongWait = function () {};

    LongWait.prototype.optionChangeHandler = function (e) {
        return Winston.Storage.set(e.target.name, e.target.checked);
    };

    LongWait.prototype.inputHandler = function (e) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([]);
            }, 1500);
        });
    };

    Winston.Package.register('LongWait', LongWait);
})(Winston);
