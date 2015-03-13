var Google = function (e) {
    this.input = e.target.value;
};

Google.prototype.inputHandler = function () {
    var commands = [];
    if (this.input.length > 0) {
        commands.push({
            title: "Google '" + this.input + "'",
            description: "Search Google for '" + this.input + "'",
            input: this.input,
            handler: function () {
                chrome.tabs.create({
                    url: 'https://www.google.com/search?q=' + this.input
                });
            }
        });
    }
    return commands;

    // fuzzy search commands
    // var f = new Fuse(commands, { keys: ['title'] });
    // var filteredCommands = f.search(input);
};
