// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var btn = Ti.UI.createButton({
    title : "Add searchable index"
});

btn.addEventListener("click", function() {
    addToSearchableIndex();
});

$.getView().add(btn);

function addToSearchableIndex() {
    var itemAttr = Ti.App.iOS.createSearchableItemAttributeSet({
        itemContentType: Ti.App.iOS.UTTYPE_AUDIO,
        title: 'Who rocks iOS 10?',
        // iOS 10 only
        fullyFormattedAddress: "1732 N 1st St, San Jose, CA 95112",
        postalCode: "95112",
        thoroughfare: "N 1st St",
        subThoroughfare: "1732",
        keywords: ['appcelerator', 'titanium_mobile', 'ios10', 'corespotlight']
    });

    var item = Ti.App.iOS.createSearchableItem({
        uniqueIdentifier: 'core-spotlight',
        domainIdentifier: 'ios10',
        attributeSet: itemAttr
    });


    var indexer = Ti.App.iOS.createSearchableIndex();
    indexer.addToDefaultSearchableIndex([item], function(e) {
        if (e.success) {
            alert('Press the home button and now search for your keywords');
        } else {
            alert('Error: ' + JSON.stringify(e.error));
        }
    });
}
