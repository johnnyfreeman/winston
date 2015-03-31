// Saves options to chrome.storage.sync.
var forEach = Array.prototype.forEach;
var packages = ['bookmarks', 'calculator', 'google', 'history', 'pinterest', 'salesforce', 'tabs', 'youtube'];

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

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    var elements = document.getElementsByClassName('option');
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.local.get(packages, function(options) {
        forEach.call(elements, function (el) {
            var name = el.name;
            el.checked = options[name];
        });
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
forEach.call(document.getElementsByClassName('option'), function (option) {
    option.addEventListener('change', saveOption);
});
