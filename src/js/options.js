var PackageManager = require('./package-manager.js');
var Storage = require('./storage.js');
var qwery = require('qwery');


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
PackageManager.register('Twitch', require('./pkg/twitch.js'));


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

var salesforceEl = qwery('#salesforce')[0];
var twitchEl = qwery('#twitch')[0];
var historyEl = qwery('#history')[0];

var handleClicksFor = function (packageName) {
    return function (e) {
        var target = e.target;
        var pkg = PackageManager.registeredPackages[packageName];

        // get access token
        if (target.className.indexOf('get-access-token') > -1) {
            pkg.getAccessToken();
        }

        // fetch data
        if (target.className.indexOf('fetch-data') > -1) {
            pkg.fetchData();
        }
    }
}

salesforceEl.addEventListener('click', handleClicksFor('Salesforce'));
twitchEl.addEventListener('click', handleClicksFor('Twitch'));
historyEl.addEventListener('click', handleClicksFor('History'));



var subdomainEl = qwery('.subdomain', salesforceEl)[0];
var accessTokenEl = qwery('.access-token', salesforceEl)[0];
var historyItemsCountEl = document.getElementById('historyItemsCount');

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
