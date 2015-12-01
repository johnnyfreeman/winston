var React = require('react'),
    ReactDOM = require('react-dom'),
    App = require('../jsx/app.jsx'),
    PackageManager = require('./package-manager.js'),
    Storage = require('./storage.js');

module.exports = function () {
    this.appComponent = React.createElement(App, null);

    // boot up core commands
    PackageManager.register('Core', require('./pkg/core.js'));
    PackageManager.enable('Core');

    // register packages
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

    // boot up packages that are enables in settings
    var optionKeys = ['Calculator', 'Links', 'Tabs', 'Bookmarks', 'Pinterest', 'Salesforce', 'YouTube', 'Twitch', 'History', 'StackOverflow', 'Google'];
    Storage.get(optionKeys).then(function(options) {
        optionKeys.forEach(function (name) {
            if (options[name] == true) {
                PackageManager.enable(name);
            }
        });
    });

    ReactDOM.render(this.appComponent, document.getElementById('container'));
};