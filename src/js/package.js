var Storage = require('./storage.js');

class Package {
    constructor() {

    }

    inputHandler(e) {

    }

    indexHandler() {

    }

    // save option value in storage
    optionChangeHandler(e) {
        return Storage.set(e.target.name, e.target.checked);
    }

    static getAccessToken() {

    }
}

module.exports = Package;
