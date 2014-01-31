goog.provide('MineGCS.BatteryPopoverViewDelegate');

/**
 * Djim Molenkamp
 * Battery Status popover providing voltage and current information
 */

/**
 * @param {{mavlinkSrc: MineGCS.MavlinkAPI, el: jQuery}} properties View
 *     properties.
 * @constructor
 * @extends {Backbone.View}
 */
MineGCS.BatteryPopoverViewDelegate = function(properties) {
  this.popoverTitle = 'Battery Status';
  goog.base(this, properties);
};
goog.inherits(MineGCS.BatteryPopoverViewDelegate , Backbone.View);

MineGCS.BatteryPopoverViewDelegate.prototype.initialize = function() {
  var mavlink = this.options['mavlinkSrc'];
  this.battery = mavlink.subscribe('SYS_STATUS', this.render, this);

};

MineGCS.BatteryPopoverViewDelegate.prototype.popoverCreated = function(el) {
  this.$el = el;
  this.$el.find('.popover-title').text(this.popoverTitle);
  this.render();
};

MineGCS.BatteryPopoverViewDelegate.prototype.popoverDestroyed = function() {
  this.$el = null;
};

MineGCS.BatteryPopoverViewDelegate.prototype.render = function() {
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

