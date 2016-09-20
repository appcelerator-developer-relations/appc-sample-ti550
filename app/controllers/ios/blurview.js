var effects;

/**
 * We wrap code that executes on creation in a self-executing function just to
 * keep it organised, not to protect global scope like it would in alloy.js
 */
(function constructor(args) {
    effects = [
        Ti.UI.iOS.BLUR_EFFECT_STYLE_EXTRA_LIGHT,
        Ti.UI.iOS.BLUR_EFFECT_STYLE_LIGHT,
        Ti.UI.iOS.BLUR_EFFECT_STYLE_DARK,
        Ti.UI.iOS.BLUR_EFFECT_STYLE_REGULAR,
        Ti.UI.iOS.BLUR_EFFECT_STYLE_PROMINENT
    ];
})(arguments[0] || {});

function doBlur(e) {
    $.blurView.setEffect(effects[e.index]);
}
