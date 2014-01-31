goog.provide('MineGCS.AltSpeedPopoverViewDelegate');

/**
 * Djim Molenkamp
 * Changed the functionality of this script to include more parameters
 * Displaying detailed Altitude and Speed information
 */

/**
 * @param {{mavlinkSrc: MineGCS.MavlinkAPI, el: jQuery}} properties View
 *     properties.
 * @constructor
 * @extends {Backbone.View}
 */
MineGCS.AltSpeedPopoverViewDelegate = function(properties) {
  this.popoverTitle = 'Vehicle Information';
  goog.base(this, properties);
};
goog.inherits(MineGCS.AltSpeedPopoverViewDelegate , Backbone.View);

MineGCS.AltSpeedPopoverViewDelegate.prototype.initialize = function() {
  var mavlink = this.options['mavlinkSrc'];
  this.vfrhud = mavlink.subscribe('VFR_HUD', this.render, this);
  this.attitude = mavlink.subscribe('ATTITUDE', this.render, this);
};

MineGCS.AltSpeedPopoverViewDelegate.prototype.popoverCreated = function(el) {
  this.$el = el;
  this.$el.find('.popover-title').text(this.popoverTitle);
  this.render();
};

MineGCS.AltSpeedPopoverViewDelegate.prototype.popoverDestroyed = function() {
  this.$el = null;
};

MineGCS.AltSpeedPopoverViewDelegate.prototype.render = function() {
  if (this.$el) {
	var gs = this.vfrhud.get('groundspeed');
	var heading = this.vfrhud.get('heading');
	var alt = this.vfrhud.get('alt');
	var climb = this.vfrhud.get('climb');
	var roll = this.attitude.get('roll');
	var pitch = this.attitude.get('pitch');
	var throttle = this.vfrhud.get('throttle');
    
	var content = ('Speed: ' + gs.toFixed(2) + ' m/s' +
				'<br />Altitude: ' + alt.toFixed(1) + ' m' +
				'<br />Climb Rate: ' + climb.toFixed(1) + ' m/s' +
				'<br />Heading: ' + heading + '&deg;' +
				'<br />Pitch Angle: ' + (pitch*180/3.141592).toFixed(0) + '&deg;' +
				'<br />Roll Angle: ' + (roll*180/3.141592).toFixed(0) + '&deg;' +
				'<br />Throttle: ' + throttle.toFixed(0) + '%');	 
    
    this.$el.find('.popover-content').html(content);
  }
};

