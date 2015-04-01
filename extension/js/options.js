var forEach = Array.prototype.forEach;

function saveOption(e) {
    var el = e.target;
    var name = el.name;
    var value = el.checked;
    option = {};
    option[name] = value;
    chrome.storage.local.set(option, function () {
        console.log('saved:', el);
    });
}

forEach.call(document.getElementsByClassName('option'), function (option) {
    option.addEventListener('change', saveOption);
});

function restore_options() {
    var elements = document.getElementsByClassName('option');

    chrome.storage.local.get(null, function(options) {
        forEach.call(elements, function (el) {
            var name = el.name;
            el.checked = options[name];
        });
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
