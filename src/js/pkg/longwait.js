(function (Winston) {
    var LongWait = function () {};

    LongWait.prototype.inputHandler = function (e) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([]);
            }, 1500);
        });
    };

    Winston.Package.register('LongWait', LongWait);
})(Winston);
