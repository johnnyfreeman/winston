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

var fetchData = document.getElementById('fetchData');
var subdomain = document.getElementById('subdomain');
var getAccessToken = document.getElementById('getAccessToken');

getAccessToken.addEventListener('click', function (e) {
    Winston.Package.registeredPackages['Salesforce'].getAccessToken(subdomain.value);
});

fetchData.addEventListener('click', function (e) {
    Winston.Package.registeredPackages['Salesforce'].fetchData();
});

subdomain.addEventListener('change', function (e) {
    Winston.Storage.set('sf-subdomain', e.target.value);
});

document.addEventListener('DOMContentLoaded', function (e) {
    Winston.Storage.get('sf-subdomain').then(function (val) {
        subdomain.value = val;
    });

    Winston.Storage.get('sf-access-token').then(function (accessToken) {
        document.getElementById('accessToken').textContent = accessToken;
        document.getElementById('accessToken').title = accessToken;
    });
});
