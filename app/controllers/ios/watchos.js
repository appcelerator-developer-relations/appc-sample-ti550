var log = require('log'),
    PROPS;

/**
 * We wrap code that executes on creation in a self-executing function just to
 * keep it organised, not to protect global scope like it would in alloy.js
 */
(function constructor(args) {
    
    // List all properties that will be checked
    PROPS = [
        'isSupported', 
        'isPaired', 
        'isReachable', 
        'isWatchAppInstalled',
        'hasContentPending',
        'remainingComplicationUserInfoTransfers'
    ];
    
    // Activate the watch-session if supported
    if (Ti.WatchSession.isSupported) {
        Ti.WatchSession.activateSession();
    }

    // Display the values of the properties
    displayValues();
})(arguments[0] || {});

function displayValues() {
    $.feedback.text = PROPS.map(function(prop) {
        return 'Ti.WatchSession.' + prop + ':\n' + Ti.WatchSession[prop];
    }).join('\n\n');
}
