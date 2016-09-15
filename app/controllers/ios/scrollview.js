var refreshControl = Ti.UI.createRefreshControl({
    tintColor: "red"
});

refreshControl.addEventListener("refreshstart", function() {    
    setTimeout(function() {

        refreshControl.endRefreshing();
    },1000);
})

$.scrollView.setRefreshControl(refreshControl);
