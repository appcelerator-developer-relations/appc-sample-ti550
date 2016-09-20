var log = require('log'),
    PROPS;

/**
 * We wrap code that executes on creation in a self-executing function just to
 * keep it organised, not to protect global scope like it would in alloy.js
 */
(function constructor(args) {
    log.args("Has URLs:", Ti.UI.Clipboard.hasURLs());
    log.args("Has images:", Ti.UI.Clipboard.hasImages());
    log.args("Has colors:", Ti.UI.Clipboard.hasColors());
    log.args("Has text:", Ti.UI.Clipboard.hasText());    
    log.args("Current clipboard value: " + Ti.UI.Clipboard.getText());
    
    PROPS = [{
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
})(arguments[0] || {});

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
