var Storage = require('../storage.js');
var docs = require('./salesforce/documentation-links.js');
var Package = require('../package.js');
var Command = require('../command.js');

class Salesforce extends Package {
    constructor() {
        super();
        var sf = this;

        // get sobjects from storage
        this.sobjects = [];
        Storage.get('sf-sobjects').then(function (options) {
            sf.sobjects = options['sf-sobjects'];
        });

        // get instance url from storage
        this.instanceUrl = '';
        Storage.get('sf-instance-url').then(function (options) {
            sf.instanceUrl = options['sf-instance-url'];
        });
    }

    static getAccessToken() {

        Storage.get('sf-subdomain').then(function (options) {
            var subdomain = options['sf-subdomain'];

            var domain = 'https://' + subdomain + '.salesforce.com';
            var clientId = '3MVG9xOCXq4ID1uGbuCfSNW3olnFLJL8Sf2xPkbsYsYqPJrvDAoOE5U_CjIjP3Wv9wsALOpqX9nTPRmcQtPIi';
            var clientSecret = '1271466885282334292';
            var redirectUri = chrome.identity.getRedirectURL('provider_cb');

            chrome.identity.launchWebAuthFlow({
                url: domain + '/services/oauth2/authorize?response_type=code&client_id=' + clientId + '&redirect_uri=' + redirectUri,
                interactive: true
            }, function(redirect_url) {

                // get authorization code
                var authCode;
                var parser = document.createElement('a');
                parser.href = redirect_url;
                parser.search.substr(1).split('&').forEach(function (attribute) {
                    var pair = attribute.split('=');
                    if (pair[0] === 'code') {
                        authCode = pair[1];
                    }
                });

                reqwest({
                    url: domain + '/services/oauth2/token',
                    method: 'post',
                    type: 'json',
                    data: {
                    code: decodeURIComponent(authCode),
                        grant_type: 'authorization_code',
                        client_id: clientId,
                        client_secret: clientSecret,
                        redirect_uri: redirectUri
                    },
                    error: function (err) {
                        console.log(err);
                    },
                    success: function (res) {
                        Promise.settle([
                            Storage.set('sf-instance-url', res.instance_url),
                            Storage.set('sf-access-token', res.token_type + ' ' + res.access_token)
                        ]).then(function () {
                            var containerEl = document.getElementById('salesforce');
                            var accessTokenEl = containerEl.getElementsByClassName('access-token')[0];
                            accessTokenEl.textContent = res.token_type + ' ' + res.access_token;
                            accessTokenEl.title = res.token_type + ' ' + res.access_token;
                            alert('Success!');
                        });
                    }
                });
            });
        });
    }

    static fetchData(e) {

        // save option value in storage
        Promise.settle([
            Storage.get('sf-instance-url'),
            Storage.get('sf-access-token'),
        ]).then(function (promises) {

            var config = {};
            config.instanceUrl = promises[0].value()['sf-instance-url'];
            config.accessToken = promises[1].value()['sf-access-token'];

            reqwest({
                url: config.instanceUrl + '/services/data',
                method: 'get',
                type: 'json',
                error: function (err) {
                    console.log(err);
                },
                success: function (versions) {

                    // use latest version
                    var i = versions.length - 1;
                    var url = versions[i].url;

                    reqwest({
                        url: config.instanceUrl + url + '/sobjects',
                        method: 'get',
                        type: 'json',
                        // data: {
                        //     q: 'select Id, DeveloperName, NamespacePrefix From CustomObject'
                        // },
                        headers: {
                            Authorization: config.accessToken
                        },
                        error: function (err) {
                            if (err.status === 401) {
                                chrome.identity.removeCachedAuthToken({
                                    token: config.accessToken
                                }, function () {
                                    Storage.set('sf-access-token', '');
                                    document.getElementById('accessToken').textContent = '';
                                    document.getElementById('accessToken').title = '';
                                    alert('Unauthorized. Access Token removed from cache.');
                                });
                            } else {
                                console.log(err);
                            }
                        },
                        success: function (response) {
                            reqwest({
                                url: config.instanceUrl + url + '/tooling/query',
                                method: 'get',
                                type: 'json',
                                data: {
                                    q: 'SELECT Id, DeveloperName, NamespacePrefix From CustomObject'
                                },
                                headers: {
                                    Authorization: config.accessToken
                                },
                                success: function (result) {
                                    var customObjects = {};
                                    for (var i = 0; i < result.records.length; i++) {
                                        var key = result.records[i].DeveloperName;
                                        if (result.records[i].NamespacePrefix) {
                                            key = result.records[i].NamespacePrefix + '__' + key;
                                        }
                                        customObjects[key] = result.records[i].Id;
                                    }

                                    for (var i = 0; i < response.sobjects.length; i++) {
                                        var key = response.sobjects[i].name.replace('__c', '');
                                        response.sobjects[i].id = customObjects[key];
                                    }

                                    Storage.set('sf-sobjects', response.sobjects).then(function () {
                                        alert('Done.');
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    inputHandler(e) {
        var sf = this;
        var input = e.target.value;
        var inputWords = input.trim().split(' ');
        var commands = [];

        // documentation
        Object.keys(docs).forEach(function (key) {
            if (input.length > 0 && key.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                commands.push(new Command({
                    id: 'SFDOC-' + key.replace(' ', '-'),
                    icon: 'cloud',
                    action: 'Open Documentation',
                    title: key,
                    url: docs[key],
                    description: 'Open Salesforce documentation',
                    handler: function () {
                        chrome.tabs.create({ url: this.url });
                    }
                }));
            }
        });

        if (inputWords.length > 1 && ['view', 'list', 'new'].indexOf(inputWords[0]) > -1) {
            for (var i = 0; i < this.sobjects.length; i++) {
                var sobject = this.sobjects[i];

                var viewTitle = 'View ' + sobject.label + ' Object';
                var listTitle = 'List ' + sobject.label + ' Records';
                var newTitle = 'New ' + sobject.label + ' Record';

                if (viewTitle.toLowerCase().indexOf(input.toLowerCase()) > -1 && sobject.layoutable && sobject.createable && sobject.deletable) { // && !sobject.custom
                    commands.push(new Command({
                        sobject: sobject,
                        icon: 'cloud',
                        action: 'View Object',
                        title: viewTitle,
                        description: 'View ' + sobject.label + ' object properties',
                        handler: function () {
                            var url;
                            if (this.sobject.custom) {
                                url = sf.instanceUrl + '/' + this.sobject.id + '?setupid=CustomObjects';
                            } else {
                                url = sf.instanceUrl + '/ui/setup/Setup?setupid=' + this.sobject.name;
                            }
                            chrome.tabs.create({ url: url });
                        }
                    }));
                }

                if (listTitle.toLowerCase().indexOf(input.toLowerCase()) > -1 && sobject.layoutable && sobject.createable && sobject.deletable) {

                    commands.push(new Command({
                        sobject: sobject,
                        icon: 'cloud',
                        action: 'List Records',
                        title: listTitle,
                        description: 'List ' + sobject.label + ' records',
                        handler: function () {
                            var url = sf.instanceUrl + '/' + this.sobject.keyPrefix;
                            chrome.tabs.create({ url: url });
                        }
                    }));
                }

                if (newTitle.toLowerCase().indexOf(input.toLowerCase()) > -1 && sobject.layoutable && sobject.createable && sobject.deletable) {
                    commands.push(new Command({
                        sobject: sobject,
                        icon: 'cloud',
                        action: 'New Record',
                        title: newTitle,
                        description: 'New ' + sobject.label + ' record',
                        handler: function () {
                            var url = sf.instanceUrl + '/' + this.sobject.keyPrefix + '/e';
                            chrome.tabs.create({ url: url });
                        }
                    }));
                }
            }
        }

        return commands;
    }
}

module.exports = Salesforce;
