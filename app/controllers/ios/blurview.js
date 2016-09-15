// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var effects =
    [Ti.UI.iOS.BLUR_EFFECT_STYLE_EXTRA_LIGHT,
    Ti.UI.iOS.BLUR_EFFECT_STYLE_LIGHT,
    Ti.UI.iOS.BLUR_EFFECT_STYLE_DARK,
    Ti.UI.iOS.BLUR_EFFECT_STYLE_REGULAR,
    Ti.UI.iOS.BLUR_EFFECT_STYLE_PROMINENT];

function doBlur(e){
    $.blurView.setEffect(effects[e.index]);
}
