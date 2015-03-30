// Saves options to chrome.storage.sync.

var packages = ['bookmarks', 'calculator', 'google', 'history', 'pinterest', 'salesforce', 'tabs', 'youtube'];

function save_options() {
    var elements = document.getElementsByClassName('option');
    var options = {};
    Array.prototype.forEach.call(elements, function (el) {
        var name = el.name;
        options[name] = el.checked;
    });

    chrome.storage.local.set(options, function () {
        console.log('saved');
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    var elements = document.getElementsByClassName('option');
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.local.get(packages, function(options) {
        Array.prototype.forEach.call(elements, function (el) {
            var name = el.name;
            el.checked = options[name];
        });
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
