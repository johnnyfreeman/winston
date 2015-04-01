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

    Package.enabledPackages = {};

    Package.enable = function (name, searchInput) {
        var packages = Package.registeredPackages;
        return Package.enabledPackages[name] = new packages[name](searchInput);
    };

    Package.disable = function (name, searchInput) {
        var packages = Package.enabledPackages;
        delete packages[name];
    };

    Winston.Package = Package;
})(Winston);
