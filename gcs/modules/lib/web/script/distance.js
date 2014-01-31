goog.provide('MineGCS.DistanceView');

/**
 * Djim Molenkamp - djimmo@gmail.com
 * Distance to WayPoint etc..
 * ..
 */

/**
 * Battery status button.
 * @param {{mavlinkSrc: MineGCS.MavlinkAPI, el: (Element|jQuery)}} properties
 *     Button properties.
 * @constructor
 * @extends {Backbone.View}
 */
MineGCS.DistanceView = function(properties) {
  goog.base(this, properties);
};
goog.inherits(MineGCS.DistanceView, Backbone.View);


/**
 * @override
 * @export
 */
MineGCS.DistanceView.prototype.initialize = function() {
  var mavlink = this.options['mavlinkSrc'];
  this.navcontrol = mavlink.subscribe('NAV_CONTROLLER_OUTPUT', this.onSysStatus, this);
  this.$el = this.options['el'];
};


/**
 * Handles SYS_STATUS mavlink messages.
 */
MineGCS.DistanceView.prototype.onSysStatus = function() {
  var wpdist = this.navcontrol.get('wp_dist');

    
  this.setButton_('btn-success', wpdist + 'm');
};


/**
 * Sets the button state.
 * @param {string} cssClass The CSS class.
 * @param {string} textLabel The button label.
 * @private
 */
MineGCS.DistanceView.prototype.setButton_ = function(cssClass, textLabel) {
  this.$el.removeClass('btn-success btn-warning btn-danger btn-inverse');
  this.$el.addClass(cssClass);
  var html = '<span class="hidden-phone">' + textLabel + '</span>';
  html += '<i class="icon-resize-horizontal icon-white visible-phone"></i>';
  this.$el.html(html);
};
