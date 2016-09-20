var log = require("log");

/**
 * We wrap code that executes on creation in a self-executing function just to
 * keep it organised, not to protect global scope like it would in alloy.js
 */
(function constructor(args) {
    // The refresh-control will be available in Alloy as well
    // Follow: https://jira.appcelerator.org/browse/ALOY-1519
    var refreshControl = Ti.UI.createRefreshControl({
        tintColor: "red"
    });

    // Add an event-listener to the refresh-control
    refreshControl.addEventListener("refreshstart", function() {    
        log.args("Ti.UI.ScrollView: ", "Refreshing started!");

        setTimeout(function() {
            refreshControl.endRefreshing();
            log.args("Ti.UI.ScrollView: ", "Refreshing finished!");
        },1000);
    })

    // Set the refresh-control in the scroll-view
    $.scrollView.setRefreshControl(refreshControl);
})(arguments[0] || {});
