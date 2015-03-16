var Pinterest = function (searchInput) {
    this.searchInput = searchInput;
};

Pinterest.prototype.inputHandler = function () {
    var commands = [];
    var deferred = Q.defer();
    var input = this.searchInput.value;

    if (input.indexOf('pin') === 0) {
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            console.log(tabs[0].url);
        });

        commands.push({
            url: this.url,
            title: "Pin this page",
            description: "Pinterest: Pin this page on Pinterest",
            action: 'Pin',
            icon: 'pinterest',
            run: function () {
                chrome.tabs.create({
                    url: 'https://www.pinterest.com/pin/create/button/?url=' + this.url
                });
            }
        });
    }



    deferred.resolve(input.length > 0 ? this.commands : []);
    return deferred.promise;
};
