
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

    refreshControl.addEventListener("refreshstart", function() {    
        setTimeout(function() {
            refreshControl.endRefreshing();
        },1000);
    })

    $.scrollView.setRefreshControl(refreshControl);
})(arguments[0] || {});
