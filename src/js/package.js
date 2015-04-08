(function () {
    var Package = function () {

    };

    Package.prototype.inputHandler = function (e) {

    };

    Package.prototype.indexHandler = function () {

    };

    Package.registeredPackages = {};

    Package.register = function (name, constructor) {
        return Package.registeredPackages[name] = constructor;
    };

    Package.instantiate = function (name) {
        return new Package.registeredPackages[name]();
    };

    Package.enabledPackages = {};

    Package.enable = function (name, searchInput) {
        return Package.enabledPackages[name] = Package.instantiate(name);
    };

    Package.disable = function (name, searchInput) {
        var packages = Package.enabledPackages;
        delete packages[name];
    };

    Winston.Package = Package;
})(Winston);
