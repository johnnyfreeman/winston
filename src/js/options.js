var PackageManager = require('./package-manager.js');
var Storage = require('./storage.js');


// register packages
PackageManager.register('Core', require('./pkg/core.js'));
PackageManager.register('Bookmarks', require('./pkg/bookmarks.js'));
PackageManager.register('Calculator', require('./pkg/calculator.js'));
PackageManager.register('Google', require('./pkg/google.js'));
PackageManager.register('Links', require('./pkg/links.js'));
PackageManager.register('Longwait', require('./pkg/longwait.js'));
PackageManager.register('Pinterest', require('./pkg/pinterest.js'));
PackageManager.register('Salesforce', require('./pkg/salesforce.js'));
PackageManager.register('StackOverflow', require('./pkg/stackoverflow.js'));
PackageManager.register('Tabs', require('./pkg/tabs.js'));
PackageManager.register('Whine', require('./pkg/whine.js'));
PackageManager.register('YouTube', require('./pkg/youtube.js'));
PackageManager.register('History', require('./pkg/history/history.js'));


var forEach = Array.prototype.forEach;

function saveOption(e) {
    return PackageManager.instantiate(e.target.name).optionChangeHandler(e);
}

forEach.call(document.getElementsByClassName('option'), function (option) {
    option.addEventListener('change', saveOption);
});

function restore_options() {
    var elements = document.getElementsByClassName('option');

    Storage.get(null).then(function (options) {
        forEach.call(elements, function (el) {
            var name = el.name;
            el.checked = options[name];
        });
    });
}

document.addEventListener('DOMContentLoaded', restore_options);

var fetchDataEl = document.getElementById('fetchData');
var fetchHistoryDataEl = document.getElementById('fetchHistoryData');
var subdomainEl = document.getElementById('subdomain');
var getAccessTokenEl = document.getElementById('getAccessToken');
var accessTokenEl = document.getElementById('accessToken');
var historyItemsCountEl = document.getElementById('historyItemsCount');

getAccessTokenEl.addEventListener('click', function (e) {
    PackageManager.registeredPackages['Salesforce'].getAccessToken(subdomainEl.value);
});

fetchDataEl.addEventListener('click', function (e) {
    PackageManager.registeredPackages['Salesforce'].fetchData();
});

fetchHistoryDataEl.addEventListener('click', function (e) {
    PackageManager.registeredPackages['History'].fetchData();
});

subdomainEl.addEventListener('change', function (e) {
    Storage.set('sf-subdomain', e.target.value);
});

historyItemsCountEl.addEventListener('change', function (e) {
    Storage.set('history-items-count', e.target.value);
});

document.addEventListener('DOMContentLoaded', function (e) {
    Storage.get('sf-subdomain').then(function (options) {
        subdomainEl.value = options['sf-subdomain'];
    });

    Storage.get('sf-access-token').then(function (options) {
        accessTokenEl.textContent = options['sf-access-token'];
        accessTokenEl.title = options['sf-access-token'];
    });

    Storage.get('history-items-count').then(function (options) {
        historyItemsCountEl.value = options['history-items-count'];
    });
});
