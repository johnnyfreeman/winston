var forEach = Array.prototype.forEach;

function saveOption(e) {
    return Winston.Package.instantiate(e.target.name).optionChangeHandler(e);
}

forEach.call(document.getElementsByClassName('option'), function (option) {
    option.addEventListener('change', saveOption);
});

function restore_options() {
    var elements = document.getElementsByClassName('option');

    Winston.Storage.getAll().then(function (options) {
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
    Winston.Package.registeredPackages['Salesforce'].getAccessToken(subdomainEl.value);
});

fetchDataEl.addEventListener('click', function (e) {
    Winston.Package.registeredPackages['Salesforce'].fetchData();
});

fetchHistoryDataEl.addEventListener('click', function (e) {
    Winston.Package.registeredPackages['History'].fetchData();
});

subdomainEl.addEventListener('change', function (e) {
    Winston.Storage.set('sf-subdomain', e.target.value);
});

historyItemsCountEl.addEventListener('change', function (e) {
    Winston.Storage.set('history-items-count', e.target.value);
});

document.addEventListener('DOMContentLoaded', function (e) {
    Winston.Storage.get('sf-subdomain').then(function (val) {
        subdomainEl.value = val;
    });

    Winston.Storage.get('sf-access-token').then(function (accessToken) {
        accessTokenEl.textContent = accessToken;
        accessTokenEl.title = accessToken;
    });

    Winston.Storage.get('history-items-count').then(function (count) {
        historyItemsCountEl.value = count;
    });
});
