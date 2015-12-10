var Storage = require('../storage.js');
var Bluebird = require('bluebird');
var Superagent = require('superagent');
var Package = require('../package.js');

const domain = 'https://api.nylas.com';
const state = Math.random().toString(36).substring(7); // csrf
const clientId = 'dpoh5cgx93rqyca7un6jkv0fb';
const clientSecret = '3wk3197s65i276ds80dznetfz';
const redirectUri = chrome.identity.getRedirectURL('provider_cb');
const scope = 'email';

class Nylas extends Package {
    inputHandler(e) {
        var commands = [];
        var value = e.target.value;
        if ('mark'.indexOf(value) > -1 || 'read'.indexOf(value) > -1) {
            commands.push({
                id: 'NYLAS',
                title: 'Mark all email as read',
                description: 'Mark all email messages as read',
                action: 'Mark Read',
                icon: 'eye-slash',
                run: function () {
                    Storage.get('nylas-access-token').then(function (options) {
                        console.log(options['nylas-access-token']);
                        Superagent
                            .get(domain + '/messages')
                            .query({
                                unread: true
                            })
                            .auth(options['nylas-access-token'], '')
                            .end(function (err, res) {
                                if (err) {
                                    console.error(err);
                                }
                                console.log('Unread: ', res);
                                
                                res.body.forEach((message) => {
                                    Superagent
                                        .put(domain + '/messages/' + message.id)
                                        .send({unread: false})
                                        .auth(options['nylas-access-token'], '')
                                        .end(function (err, res) {
                                            if (err) {
                                                console.error(err);
                                            }
                                            console.log('Marked: ', res);
                                        });
                                });

                                alert('All message marked as read. See console for response(s).');
                            });
                    });
                }
            });
        }

        return commands;
    }

    static getAuthorization() {
        return new Bluebird(function (resolve, reject) {
            try {
                chrome.identity.launchWebAuthFlow({
                    url: domain + '/oauth/authorize?response_type=code&client_id=' + clientId + '&redirect_uri=' + redirectUri + '&scope=' + scope,
                    interactive: true
                }, function (redirect_url) {
                    var authCode;
                    var parser = document.createElement('a');
                    parser.href = redirect_url;
                    parser.search.substr(1).split('&').forEach(function (attribute) {
                        var pair = attribute.split('=');
                        if (pair[0] === 'code') {
                            resolve(pair[1]);
                        }
                    });
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    static getAccessToken() {
        return Nylas.getAuthorization().then(function (authCode) {
            Superagent
                .post(domain + '/oauth/token')
                .send({
                    code: decodeURIComponent(authCode),
                    grant_type: 'authorization_code',
                    client_id: clientId,
                    client_secret: clientSecret
                })
                .end(function (err, res) {
                    var auth;
                    if (err) {
                        console.error(err);
                        return;
                    }
                    auth = res.body.access_token;
                    Storage.set('nylas-access-token', auth);
                    try {
                        var containerEl = document.getElementById('nylas');
                        var accessTokenEl = containerEl.getElementsByClassName('access-token')[0];
                        accessTokenEl.textContent = auth;
                        accessTokenEl.title = auth;
                    } catch (e) {}
                });
        });
    }
}

module.exports = Nylas;
