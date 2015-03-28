var Google = function (searchInput) {
    this.searchInput = searchInput;
};

Google.prototype.inputHandler = Promise.method(function (searchInput) {
    var input = this.searchInput.value;
    var commands = [];

    if (input.length > 0) {
        commands.push(new GoogleSearchCommand(input));
        commands.push(new GoogleLuckyCommand(input));
    }

    return commands;

    // fuzzy search commands
    // var f = new Fuse(commands, { keys: ['title'] });
    // var filteredCommands = f.search(input);
});


var GoogleSearchCommand = function (inputString) {
    this.id = 'GOOGLE1';
    this.input = inputString.trim();
    this.icon = 'google';
    this.action = 'Search';
    this.title = 'Google "' + this.input + '"';
    this.description = 'Google: Open Google search results';
};

GoogleSearchCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.google.com/search?q=' + encodeURIComponent(this.input) });
};

var GoogleLuckyCommand = function (inputString) {
    this.id = 'GOOGLE2';
    this.input = inputString.trim();
    this.icon = 'google';
    this.action = 'Open';
    this.title = 'I\'m Feeling Lucky';
    this.description = 'Google: Open the first result from Google';
};

GoogleLuckyCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.google.com/search?btnI=I&q=' + encodeURIComponent(this.input) });
};
