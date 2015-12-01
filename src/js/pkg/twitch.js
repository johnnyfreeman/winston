var Storage = require('../storage.js');
var Bluebird = require('bluebird');
var Superagent = require('superagent');
var Package = require('../package.js');

const domain = 'https://api.twitch.tv/kraken';
const memeType = 'application/vnd.twitchtv.v3+json'; // api version to use
const state = Math.random().toString(36).substring(7); // csrf

class Twitch extends Package {
    inputHandler(e) {
        var commands = [];
        var value = e.target.value;

        // only make request if 
        // value 3 or greater
        if (value.length < 3) {
            return commands;
        }

        return new Bluebird(function (resolve, reject) {
            Storage.get('twitch-authorization').then(function (options) {
                Superagent
                    .get(domain + '/search/streams')
                    .query({
                        query: value,
                        limit: 5
                    })
                    .set({
                        Accept: memeType,
                        Authorization: options['twitch-authorization'],
                        state: state
                    })
                    .end(function (err, res) {
                        if (err) {
                            reject(err);
                        }
                        res.body.streams.forEach(function (stream) {
                            commands.push({
                                id: 'TWITCH' + stream._id,
                                title: stream.channel.status,
                                description: stream.channel.display_name + ' playing ' + stream.game,
                                action: 'Open Stream',
                                icon: 'twitch',
                                run: function () {
                                    chrome.tabs.create({ url: stream.channel.url });
                                }
                            });
                        });
                        resolve(commands);
                    });
            });
        });
    }

    static getAccessToken() {
        var clientId = '4wf6ic2a9ia2fn2z8oai7s8exwn38wx';
        var clientSecret = 'tmlriursrqam6lpizvxqwlqt34e94kf';
        var redirectUri = chrome.identity.getRedirectURL('provider_cb');
        var scope = [
            'user_read', // Read access to non-public user information, such as email address.
            'user_blocks_edit', // Ability to ignore or unignore on behalf of a user.
            'user_blocks_read', // Read access to a user's list of ignored users.
            'user_follows_edit', // Access to manage a user's followed channels.
            'channel_read', // Read access to non-public channel information, including email address and stream key.
            'channel_editor', // Write access to channel metadata (game, status, etc).
            'channel_commercial', // Access to trigger commercials on channel.
            'channel_stream', // Ability to reset a channel's stream key.
            'channel_subscriptions', // Read access to all subscribers to your channel.
            'user_subscriptions', // Read access to subscriptions of a user.
            'channel_check_subscription', // Read access to check if a user is subscribed to your channel.
            'chat_login' // Ability to log into chat and send messages.
        ].join('+');

        chrome.identity.launchWebAuthFlow({
            url: domain + '/oauth2/authorize?response_type=code&client_id=' + clientId + '&redirect_uri=' + redirectUri + '&scope=' + scope,
            interactive: true
        }, function (redirect_url) {

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

            // get access token
            Superagent
                .post(domain + '/oauth2/token')
                .set({
                    Accept: memeType
                })
                .send({
                    code: decodeURIComponent(authCode),
                    grant_type: 'authorization_code',
                    client_id: clientId,
                    client_secret: clientSecret,
                    redirect_uri: redirectUri,
                    state: state
                })
                .end(function (err, res) {
                    var auth;
                    if (err) {
                        console.error(err);
                        return;
                    }
                    auth = 'OAuth ' + res.body.access_token;
                    Storage.set('twitch-authorization', auth);
                    try {
                        var containerEl = document.getElementById('twitch');
                        var accessTokenEl = containerEl.getElementsByClassName('access-token')[0];
                        accessTokenEl.textContent = auth;
                        accessTokenEl.title = auth;
                    } catch (e) {}
                });
        });
    }
}

module.exports = Twitch;
