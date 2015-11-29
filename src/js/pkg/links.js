var Storage = require('../storage.js');

var Links = function () {
    var inst = this;
    this.links = [];
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {getAllLinks: true}, function (response) {
            if (typeof response !== 'undefined') inst.links = response;
        });
    });
};

Links.prototype.optionChangeHandler = function (e) {
    return Storage.set(e.target.name, e.target.checked);
};

Links.prototype.inputHandler = function (e) {
    var input = e.target.value;
    var commands = [];

    if (input.length > 0) {
        this.links.forEach(function (a, i) {
            if (a.innerText.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                commands.push({
                    id: 'LINKS' + i,
                    icon: 'link',
                    title: a.innerText,
                    url: a.href,
                    description: a.href,
                    action: 'Follow Link',
                    run: function () {
                        var newUrl = this.url;
                        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                            chrome.tabs.update(tabs[0].id, {url: newUrl });
                            window.close();
                        });
                    }
                });
            }
        });
    }

    return commands;

    // fuzzy search commands
    // var f = new Fuse(commands, { keys: ['title'] });
    // var filteredCommands = f.search(input);
};

module.exports = Links;
