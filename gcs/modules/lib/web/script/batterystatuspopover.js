goog.provide('GCSDjimMolenkamp.BatteryPopoverViewDelegate');

/**
 * Djim Molenkamp
 * Changed the functionality of this script to include more parameters
 * and using a filtered GPS position rather than raw data from the GPS
 * Adding more battery parameters
 */

/**
 * @param {{mavlinkSrc: GCSDjimMolenkamp.MavlinkAPI, el: jQuery}} properties View
 *     properties.
 * @constructor
 * @extends {Backbone.View}
 */
GCSDjimMolenkamp.BatteryPopoverViewDelegate = function(properties) {
  this.popoverTitle = 'Battery Status';
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.BatteryPopoverViewDelegate , Backbone.View);

GCSDjimMolenkamp.BatteryPopoverViewDelegate.prototype.initialize = function() {
  var mavlink = this.options['mavlinkSrc'];
  this.battery = mavlink.subscribe('SYS_STATUS', this.render, this);

};

GCSDjimMolenkamp.BatteryPopoverViewDelegate.prototype.popoverCreated = function(el) {
  this.$el = el;
  this.$el.find('.popover-title').text(this.popoverTitle);
  this.render();
};

GCSDjimMolenkamp.BatteryPopoverViewDelegate.prototype.popoverDestroyed = function() {
  this.$el = null;
};

GCSDjimMolenkamp.BatteryPopoverViewDelegate.prototype.render = function() {
  if (this.$el) {
	var voltage = this.battery.get('voltage_battery')/1000;
	var current = this.battery.get('current_battery')/100;
	var remaining = this.battery.get('battery_remaining');
 
	var content = ('Voltage: ' + voltage.toFixed(2) + ' V' +
				'<br />Current: ' + current.toFixed(1) + ' A' +
				'<br />Battery Remaining: ' + remaining + ' %');	 
    
    this.$el.find('.popover-content').html(content);
  }
};

