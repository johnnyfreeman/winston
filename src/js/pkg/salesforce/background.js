(function (Winston) {

    var clientId = '3MVG9xOCXq4ID1uGbuCfSNW3olnFLJL8Sf2xPkbsYsYqPJrvDAoOE5U_CjIjP3Wv9wsALOpqX9nTPRmcQtPIi';
    var clientSecret = '1271466885282334292';
    var redirectUri = chrome.identity.getRedirectURL('provider_cb');

    chrome.identity.launchWebAuthFlow({
        url: 'https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=' + clientId + '&redirect_uri=' + redirectUri,
        interactive: true
    }, function(redirect_url) {
        console.log('redirect_url=', redirect_url);
        var token;
        var parser = document.createElement('a');
        parser.href = redirect_url;
        parser.search.substr(1).split('&').forEach(function (attribute) {
            var pair = attribute.split('=');
            if (pair[0] === 'code') {
                token = pair[1];
            }
        });

        // https://login.salesforce.com/services/oauth2/token

        console.log('token=', decodeURIComponent(token));

        reqwest({
            url: 'https://login.salesforce.com/services/oauth2/token',
            method: 'post',
            type: 'json',
            data: {
                code: decodeURIComponent(token),
                grant_type: 'authorization_code',
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri
            }
        }).then(function (res) {
            console.log('res=', res);
            var instanceUrl = res.instance_url;
            var auth = res.token_type + ' ' + res.access_token;

            reqwest({
                url: instanceUrl + '/services/data',
                method: 'get',
                type: 'json',
                success: function (versions) {
                    console.log('versions=', versions);
                    // use latest version
                    var i = versions.length - 1;
                    var url = versions[i].url;

                    reqwest({
                        url: instanceUrl + url + '/sobjects',
                        method: 'get',
                        type: 'json',
                        headers: {
                            Authorization: auth
                        },
                        success: function (response) {
                            console.log('response=', response);
                        }
                    });
                }
            });
        });
    });

})(Winston);
