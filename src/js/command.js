var _ = require('lodash');

// default options
var defaultOptions = {
    id: _.uniqueId('COMMAND'),
    icon: 'terminal',
    action: 'execute',
    handler: function () {
        window.close(); // close popup
    }
};

class Command {
    constructor(options) {
        _.extend(this, defaultOptions, options);
    }

    run() {
        return this.handler();
    }
}

module.exports = Command;