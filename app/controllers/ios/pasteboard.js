var log = require('log'),
    PROPS;

/**
 * We wrap code that executes on creation in a self-executing function just to
 * keep it organised, not to protect global scope like it would in alloy.js
 */
(function constructor(args) {
    
    // Log current clipboard states
    log.args("Has URLs:", Ti.UI.Clipboard.hasURLs());
    log.args("Has images:", Ti.UI.Clipboard.hasImages());
    log.args("Has colors:", Ti.UI.Clipboard.hasColors());
    log.args("Has text:", Ti.UI.Clipboard.hasText());    
    log.args("Current clipboard value: " + Ti.UI.Clipboard.getText());
    
    // Avaulable validators and getter
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
    // New constants to control the privacy. SInce they are objects-constants, they need to be assigned to a property first
    var localOnly = Ti.UI.CLIPBOARD_OPTION_LOCAL_ONLY;
    var expirationDate = Ti.UI.CLIPBOARD_OPTION_EXPIRATION_DATE;

    // Build the clipboard arguments
    var args = {
        items: [{
            "text/plain": "John Doe" // Use this API to generically set mime-types that set the color, image, url or text
        }],
        options: { // Optional settings to control the privacy of the clipboard-item
            localOnly: false,
            expirationDate: new Date(2020, 04, 20)
        }
    };
    
    log.args("Ti.UI.Clipboard.setItems", args);

    // Set mime-type based items with additional options
    Ti.UI.Clipboard.setItems(args);
    
    // Refresh the list of set properties
    refresh();
}

refresh();
