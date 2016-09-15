// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var log = require('log');

log.args("Has URLs:", Ti.UI.Clipboard.hasURLs());
log.args("Has images:", Ti.UI.Clipboard.hasImages());
log.args("Has colors:", Ti.UI.Clipboard.hasColors());
log.args("Has text:", Ti.UI.Clipboard.hasText());
console.log(Ti.UI.Clipboard.getText());

var log = require('log');

var PROPS = [{
    name: 'hasURLs',
    get: 'getURL'
}, {
    name: 'hasImages',
    get: 'getImage'
}, {
    name: 'hasColors',
    get: 'getColor'
}, {
    name: 'hasText',
    get: 'getText'
}];

function refresh() {
    // Show properties values
    $.feedback.text = PROPS.map(function(prop) {
        return prop.name + ':\n' + (Ti.UI.Clipboard[prop.name]() + ' ' + (Ti.UI.Clipboard[prop.get]() || ''));
    }).join('\n\n');
}

function doSetClipboard() {
    var localOnly = Ti.UI.CLIPBOARD_OPTION_LOCAL_ONLY;
    var expirationDate = Ti.UI.CLIPBOARD_OPTION_EXPIRATION_DATE;

    // Set mime-type based items with additional options
    Ti.UI.Clipboard.setItems({
        items: [{
            "text/plain": "John",
        }, {
            "text/plain": "Doe"
        }],
        options: {
            localOnly: false,
            expirationDate: new Date(2020, 04, 20)
        }
    });
    refresh();
}

refresh();
