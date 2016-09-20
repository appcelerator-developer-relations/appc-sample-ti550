var log = require('log');

/**
 * We wrap code that executes on creation in a self-executing function just to
 * keep it organised, not to protect global scope like it would in alloy.js
 */
(function constructor(args) {
    // Create a new attribute set with all necessary information
    // This attribute set can be searched after tapping the "Search" button
    var itemAttr = Ti.App.iOS.createSearchableItemAttributeSet({
        itemContentType: Ti.App.iOS.UTTYPE_PLAIN_TEXT,
        title: "Who rocks iOS 10?",
        
        // New iOS 10 attributes
        fullyFormattedAddress: "1732 N 1st St, San Jose, CA 95112",
        postalCode: "95112",
        thoroughfare: "N 1st St",
        subThoroughfare: "1732",
        keywords: ['appcelerator', 'titanium_mobile', 'ios10', 'corespotlight']
    });

    // Create a new searchable item that uses the previously created attribute set
    var item = Ti.App.iOS.createSearchableItem({
        uniqueIdentifier: "appc-sample-550-searchquery", // If you change this identifier, a new item will be added the next time you run it
        domainIdentifier: "com.appcelerator", // Used for group-level content-sharing
        attributeSet: itemAttr
    });

    // Add the item to the global Spotlight index
    var indexer = Ti.App.iOS.createSearchableIndex();

    indexer.addToDefaultSearchableIndex([item], function(e) {
        if (e.success) {
            log.args("Ti.App.iOS.SearchQuery:","Searchable item added to the Spotlight index. You can press the home button and now search for your keywords");
        } else {
            Ti.UI.createAlertDialog({
                title: "Error occurred", 
                message: "Could not add to the searchable index: " + JSON.stringify(e.error)
            }).show();
        }
    });
})(arguments[0] || {});

function startSearch() {
    
    // Hide the placeholder
    $.placeholder.hide();
    
    // An array of found Ti.App.iOS.SearchableItem's
    var allItems = [];

    // The search-query
    var searchQuery = Ti.App.iOS.createSearchQuery({
        queryString: 'title == "*iOS 10*"',
        attributes: ["title", "keywords", "fullyFormattedAddress", "postalCode"]
    });

    // The event to be called when a new batch of items is found
    searchQuery.addEventListener("founditems", function(e) {
        log.args("Found new items:", e.items);
        
        for (var i = 0; i < e.items.length; i++) {
            allItems.push(e.items[i]);
        }
    });

    // The event to be called when the search-query completes
    searchQuery.addEventListener("completed", function(e) {
        if (!e.success) {
            alert(e.error);
        }
        
        log.args("Completed search-query:", allItems.length + " items found!");

        var cells = [];

        // Loop through the results and access any properties you want
        for (var i = 0; i < allItems.length; i++) {
            var attributeSet = allItems[i].attributeSet

            cells.push({
                properties: {
                    title: attributeSet.title,
                    subtitle: attributeSet.keywords.join(", ")
                }
            });
        }

        // Display the result
        $.list.setSections([Ti.UI.createListSection({
            items: cells,
            footerTitle: String(cells.length + " " + ((cells.length == 1) ? "result" : "results") + " found")
        })]);
        
        allItems = [];
    });

    // Start the search-query (or use searchQuery.cancel()) to abort it
    searchQuery.start();
}
