var Storage = require('../storage.js');

var Pinterest = function () {
    var pinterest = this;

    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        pinterest.url = tabs[0].url;
    });
};

Pinterest.prototype.optionChangeHandler = function (e) {
    return Storage.set(e.target.name, e.target.checked);
};

Pinterest.prototype.inputHandler = function (e) {
    var commands = [];
    var input = e.target.value;

    if (input.indexOf('pin') === 0) {
        commands.push({
            url: this.url,
            title: "Pin this page",
            description: this.url,
            action: 'Pin Page',
            icon: 'pinterest',
            run: function () {
                chrome.tabs.create({
                    url: 'https://www.pinterest.com/pin/create/button/?url=' + this.url
                });
            }
        });
    }

    return commands;
};

module.exports = Pinterest;
