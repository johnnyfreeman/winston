(function (Winston) {
    var Google = function () {};

    Google.prototype.inputHandler = function (e) {
        var input = e.target.value;
        var commands = [];
        
        if (input.length > 0) {
            commands.push(new GoogleSearchCommand(input));
            commands.push(new GoogleLuckyCommand(input));
        }

        return commands;

        // fuzzy search commands
        // var f = new Fuse(commands, { keys: ['title'] });
        // var filteredCommands = f.search(input);
    };


    var GoogleSearchCommand = function (inputString) {
        this.id = 'GOOGLE1';
        this.input = inputString.trim();
        this.icon = 'google';
        this.action = 'Search Google';
        this.title = 'Google "' + this.input + '"';
        this.description = 'Open Google search results';
    };

    GoogleSearchCommand.prototype.run = function () {
        chrome.tabs.create({ url: 'https://www.google.com/search?q=' + encodeURIComponent(this.input) });
    };

    var GoogleLuckyCommand = function (inputString) {
        this.id = 'GOOGLE2';
        this.input = inputString.trim();
        this.icon = 'google';
        this.action = 'Get Lucky';
        this.title = 'I\'m Feeling Lucky';
        this.description = 'Open the first result from Google';
    };

    GoogleLuckyCommand.prototype.run = function () {
        chrome.tabs.create({ url: 'https://www.google.com/search?btnI=I&q=' + encodeURIComponent(this.input) });
    };

    Winston.Package.register('Google', Google);
})(Winston);
