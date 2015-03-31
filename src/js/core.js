var Core = function (searchInput) {
    this.searchInput = searchInput;
    var core = this;

    this.packagesEnabled = 0;
    chrome.storage.local.get(null, function(options) {
        Object.keys(options).forEach(function (packageName) {
            if (options[packageName] == true) {
                core.packagesEnabled++;
            }
        });
    });
};

Core.prototype.inputHandler = function () {
    var input = this.searchInput.value;
    var commands = [];

    if (this.packagesEnabled === 0) {
        commands.push({
            id: 'CORE1',
            icon: 'cog',
            title: 'Setup',
            description: 'Open options page and enable packages',
            action: 'Setup',
            run: function () {
                var extId = chrome.runtime.id;
                chrome.tabs.create({ url: 'chrome://extensions?options=' + extId });
            }
        });
    }

    return commands;
};
