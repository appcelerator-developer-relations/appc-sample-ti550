
/**
 * We wrap code that executes on creation in a self-executing function just to
 * keep it organised, not to protect global scope like it would in alloy.js
 */
(function constructor(args) {

})(arguments[0] || {});

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
