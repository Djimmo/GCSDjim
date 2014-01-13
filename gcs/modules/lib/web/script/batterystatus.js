goog.provide('GCSDjimMolenkamp.BatteryButton');



/**
 * Battery status button.
 * @param {{mavlinkSrc: GCSDjimMolenkamp.MavlinkAPI, el: (Element|jQuery)}} properties
 *     Button properties.
 * @constructor
 * @extends {Backbone.View}
 */
GCSDjimMolenkamp.BatteryButton = function(properties) {
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.BatteryButton, Backbone.View);


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.BatteryButton.prototype.initialize = function() {
  var mavlink = this.options['mavlinkSrc'];
  this.sysstatus = mavlink.subscribe('SYS_STATUS', this.onSysStatus, this);
  this.$el = this.options['el'];
};


/**
 * Handles SYS_STATUS mavlink messages.
 */
GCSDjimMolenkamp.BatteryButton.prototype.onSysStatus = function() {
  var stat = this.sysstatus;
  var remaining = stat.get('battery_remaining');
  var voltage = stat.get('voltage_battery')/1000;
  if (remaining < 30) {
    this.setButton_('btn-warning', remaining.toFixed(0) + '% @' + voltage.toFixed(1) + 'V');
  } else if (remaining < 20) {
    this.setButton_('btn-danger',
                    remaining.toFixed(0) + '% @' + voltage.toFixed(1) + 'V');
  } else if (remaining === undefined) {
    this.setButton_('btn-inverse', 'Unknown');
  } else {
    this.setButton_('btn-success', remaining.toFixed(0) + '% @' + voltage.toFixed(1) + 'V');
  }
};


/**
 * Sets the button state.
 * @param {string} cssClass The CSS class.
 * @param {string} textLabel The button label.
 * @private
 */
GCSDjimMolenkamp.BatteryButton.prototype.setButton_ = function(cssClass, textLabel) {
  this.$el.removeClass('btn-success btn-warning btn-danger btn-inverse');
  this.$el.addClass(cssClass);
  var html = '<span class="hidden-phone">Batt: ' + textLabel + '</span>';
  html += '<i class="icon-fire icon-white visible-phone"></i>';
  this.$el.html(html);
};
