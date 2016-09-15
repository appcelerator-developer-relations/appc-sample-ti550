var log = require('log');

var activity;

/**
 * I wrap code that executes on creation in a self-executing function just to
 * keep it organised, not to protect global scope like it would in alloy.js
 */
(function constructor(args) {

  if (Alloy.Globals.isSupported) {

    if (OS_IOS) {
      initActivity();

      if (Alloy.isTablet) {
        initMultitasking();
      }
    }
  }

  // Wait a bit to make it easier to see fullscreen and storyboard changes
  setTimeout(function() {

    // Opens either the TabGroup or "Not Supported" Window depending on
    // the Alloy.Globals.isSupported flag used in index.xml
    $.index.open();

  }, 2000);

})(arguments[0] || {});

function onListViewItemclick(e) {
  var item = e.section.getItemAt(e.itemIndex);

  // We use classes in index.xml with conditional TSS in index.tss to set this flag
  if (item.properties.unsupported) {
    return alert('Your device does not meet the requirements for this example.');
  }

  var controllerName = e.itemId;

  // Special case. We want to list the Tab sample but it should select the middle tab.
  if (controllerName === 'tab') {
    $.index.tabs[1].active = true;
    return;
  }

  openSample(controllerName);
}

function openSample(controllerName) {
  var controller = Alloy.createController(controllerName);

  $.samplesTab.open(controller.getView());
}

// iOS: Show how the usage of needsSave has changed
function initActivity() {

  activity = Ti.App.iOS.createUserActivity({
    activityType: 'com.appcelerator.sample.ti550.tab',
    title: Ti.App.name,
    userInfo: {
      activeTabIndex: 0
    }
  });

  if (activity.isSupported()) {
    activity.becomeCurrent();

    Ti.App.iOS.addEventListener('continueactivity', function(e) {
      log.args('Ti.App.iOS:continueactivity', e);

      // Activate the tab active on the other device
      if (e.activityType === 'com.appcelerator.sample.ti550.tab') {
        $.index.tabs[e.userInfo.activeTabIndex].active = true;
      }

    });

    // When a tab receives focus
    $.index.addEventListener('focus', function(e) {
      var userInfo = {
        activeTabIndex: e.index
      };

      log.args('Ti.App.iOS.UserActivity.userInfo', userInfo);

      // Update the userInfo here, where before we would need to wait for
      // the useractivitywillsave event
      activity.userInfo = userInfo;

      // Inform iOS the activity has changed
      activity.needsSave = true;
    });
  }
}

// iPad: Logs the TabGroup dimensions each time we switch fullscreen, Slide Over or Split View mode
function initMultitasking() {

  function logDimensions(e) {
    log.args('Ti.App:' + e.type + ' was fired and our dimensions are:', {
      'Ti.Platform.displayCaps.platformWidth': Ti.Platform.displayCaps.platformWidth,
      'Ti.Platform.displayCaps.platformHeight': Ti.Platform.displayCaps.platformHeight,
      '$.index.size.width': $.index.size.width,
      '$.index.size.height': $.index.size.height
    });
  }

  // This event fires when the app was still active in the background when it Slides Over another app
  Ti.App.addEventListener('resume', logDimensions);

  // Will (also) fires when:
  // 1) This app Slides Over another app
  // 2) This app goes from Slide Over to Split View
  // 3) This app goes from quarter to half Split View or visa versa
  // 4) The user dragged the Split View devider but released it to bounce back to existing mode
  // 5) This app goes from Split View to full view (by dragging the devider to the left edge)
  // 6) This app goes from Split View to Slide Over (by singletap on devider)
  // 7) Another app goes from Slide Over to Split View
  //
  // It does not fire when:
  // 1) Another app goes from Slit View to Slide Over (by singletap on devider)
  Ti.App.addEventListener('resumed', logDimensions);

  // 1) Another app starts to Slide Over
  // 2) Another app starts to go from right Split View to Slide Over (by singletap on devider)
  // 3) The user starts dragging the Split View devider
  Ti.App.addEventListener('pause', logDimensions);

  // This event fires when another app is dragged from quarter or half Split View to fullscreen
  Ti.App.addEventListener('paused', logDimensions);
}
