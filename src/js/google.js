var Google = function (searchInput) {
    this.searchInput = searchInput;
};

Google.prototype.inputHandler = function (searchInput) {
    var deferred = Q.defer();
    var input = this.searchInput.value;

    var commands = [
        new GoogleSearchCommand(input),
        new GoogleLuckyCommand(input)
    ];

    deferred.resolve(input.length > 0 ? commands : []);
    return deferred.promise;

    // fuzzy search commands
    // var f = new Fuse(commands, { keys: ['title'] });
    // var filteredCommands = f.search(input);
};


var GoogleSearchCommand = function (inputString) {
    this.id = 'GOOGLE1';
    this.input = inputString;
    this.icon = 'google';
    this.title = 'Google "' + this.input + '"';
    this.description = 'Open Google search results';
};

GoogleSearchCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.google.com/search?q=' + this.input });
};

var GoogleLuckyCommand = function (inputString) {
    this.id = 'GOOGLE2';
    this.input = inputString;
    this.icon = 'google';
    this.title = 'I\'m Feeling Lucky';
    this.description = 'Open the first result from Google';
};

GoogleLuckyCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.google.com/search?btnI=I&q=' + this.input });
};
