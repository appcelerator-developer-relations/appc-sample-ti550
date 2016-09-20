var log = require('log'),
    PROPS;

/**
 * We wrap code that executes on creation in a self-executing function just to
 * keep it organised, not to protect global scope like it would in alloy.js
 */
(function constructor(args) {
    PROPS = [
        'isSupported', 
        'isPaired', 
        'isReachable', 
        'isWatchAppInstalled',
        'hasContentPending',
        'remainingComplicationUserInfoTransfers'
    ];
    
    if (Ti.WatchSession.isSupported) {
        Ti.WatchSession.activateSession();
    }

    // Show properties values
    $.feedback.text = PROPS.map(function(prop) {
        return 'Ti.WatchSession.' + prop + ':\n' + Ti.WatchSession[prop];
    }).join('\n\n');
})(arguments[0] || {});
