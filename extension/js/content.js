(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

/**
 * Insert the text at the cursor into the active element. Note that we're
 * intentionally not appending or simply replacing the value of the editable
 * field, as we want to allow normal pasting conventions. If you paste at the
 * beginning, you shouldn't see all your text be replaced.
 * Taken from:
 * http://stackoverflow.com/questions/7404366/how-do-i-insert-some-text-where-the-cursor-is
 */
;
function insertTextAtCursor(text) {
    var el = document.activeElement;
    var val = el.value;
    var endIndex;
    var range;
    var doc = el.ownerDocument;
    if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
        endIndex = el.selectionEnd;
        el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
        el.selectionStart = el.selectionEnd = endIndex + text.length;
    } else if (doc.selection !== 'undefined' && doc.selection.createRange) {
        el.focus();
        range = doc.selection.createRange();
        range.collapse(false);
        range.text = text;
        range.select();
    }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.data) {
        insertTextAtCursor(request.data);
    }
});

function getAllLinks() {
    var links = [];
    Array.prototype.forEach.call(document.getElementsByTagName('a'), function (a) {
        if (a.innerText.length > 0) {
            links.push({
                innerText: a.innerText,
                href: a.href
            });
        }
    });
    return links;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('request: ', request);
    console.log('sender: ', sender);
    if (request.getAllLinks) {
        return sendResponse(getAllLinks());
    }
});

},{}]},{},[1])


//# sourceMappingURL=content.js.map
