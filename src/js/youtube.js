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
    var youtube = this;

    if (input.length > 0) {
        this.hardKeywords.concat(this.softKeywords).forEach(function (keyword) {
            var inputWords = input.trim().split(' ');
            var query = input;

            inputWords.forEach(function (inputWord) {
                var matchesKeyword = keyword.indexOf(inputWord) > -1;
                var inputWordIndex = query.indexOf(inputWord);

                // continue to next inputWord if this doesn't match the current keyword
                if (!matchesKeyword) return;

                // remove hard keywords
                if (youtube.hardKeywords.indexOf(keyword) > -1) {
                    query = query.replace(inputWord, '').trim();
                }

                // replace soft keywords
                query = query.replace(inputWord, keyword);

                commands.push(new YoutubeSearchCommand(query));
            });
        });
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
