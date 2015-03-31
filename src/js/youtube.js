var Youtube = function (searchInput) {
    this.searchInput = searchInput;

    // hard keywords are stripped from the query
    this.hardKeywords = ['video', 'youtube'];
    this.softKeywords = ['cover', 'movie', 'music', 'trailer', 'tutorial', 'how'];
};

Youtube.prototype.inputHandler = function () {
    var input = this.searchInput.value;
    var commands = [];
    var youtube = this;

    if (input.length > 0) {
        this.hardKeywords.concat(this.softKeywords).forEach(function (keyword, keywordIndex) {
            var inputWords = input.trim().split(' ');
            var query = input;

            inputWords.forEach(function (inputWord, inputWordIndex) {
                var matchesKeyword = keyword.indexOf(inputWord) === 0;

                // continue to next inputWord if this doesn't match the current keyword
                if (!matchesKeyword) return;

                // remove hard keywords
                if (youtube.hardKeywords.indexOf(keyword) > -1) {
                    query = query.replace(inputWord, '').trim();
                }

                // replace soft keywords
                query = query.replace(inputWord, keyword);

                if (query.length > 0) {
                    commands.push(new YoutubeSearchCommand(query, keywordIndex.toString() + inputWordIndex.toString()));
                } else {
                    commands.push(new YoutubeHomeCommand());
                }
            });
        });
    }

    return commands;
};

var YoutubeHomeCommand = function () {
    this.id = 'YOUTUBEHOME';
    this.icon = 'youtube';
    this.action = 'Open Site';
    this.title = 'YouTube.com';
    this.description = 'YouTube: Open YouTube.com';
};

YoutubeHomeCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.youtube.com/' });
};

var YoutubeSearchCommand = function (query, i) {
    this.id = 'YOUTUBE' + i;
    this.query = query;
    this.icon = 'youtube';
    this.action = 'Search YouTube';
    this.title = 'YouTube "' + this.query + '"';
    this.description = 'YouTube: Open YouTube search results';
};

YoutubeSearchCommand.prototype.run = function () {
    chrome.tabs.create({ url: 'https://www.youtube.com/results?search_query=' + encodeURIComponent(this.query) });
};
