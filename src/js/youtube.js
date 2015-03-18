var Youtube = function (searchInput) {
    this.searchInput = searchInput;

    // hard keywords are stripped from the query
    this.hardKeywords = ['video', 'youtube'];
    this.softKeywords = ['cover', 'movie', 'music', 'trailer', 'tutorial'];
};

Youtube.prototype.inputHandler = function () {
    var deferred = Q.defer();
    var input = this.searchInput.value;
    var commands = [];

    // determine if input contains any keywords
    var keywordFound = false;
    this.hardKeywords.concat(this.softKeywords).forEach(function (keyword) {
        if (input.indexOf(keyword) > -1) {
            keywordFound = true;
        }
    });

    var query = input;
    if (keywordFound) {
        // stip out hard keywords
        this.hardKeywords.forEach(function (hardKeyword) {
            query = query.replace(hardKeyword, '').trim();
        });

        // add command
        commands.push(new YoutubeSearchCommand(query));
    }

    deferred.resolve(commands);
    return deferred.promise;
};

var YoutubeSearchCommand = function (query) {
    this.id = 'YOUTUBE1';
    this.query = query;
    this.icon = 'youtube';
    this.action = 'Search';
    this.title = 'YouTube "' + this.query + '"';
    this.description = 'YouTube: Open YouTube search results';
};

YoutubeSearchCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.youtube.com/results?search_query=' + this.query });
};
