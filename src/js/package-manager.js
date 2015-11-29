
module.exports = {
    registeredPackages: {},
    enabledPackages: {},

    register: function (name, constructor) {
        return this.registeredPackages[name] = constructor;
    },

    instantiate: function (name) {
        return new this.registeredPackages[name]();
    },

    enable: function (name) {
        return this.enabledPackages[name] = this.instantiate(name);
    },

    disable: function (name) {
        var packages = this.enabledPackages;
        delete packages[name];
    }

};
