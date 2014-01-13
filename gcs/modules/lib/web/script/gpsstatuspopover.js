goog.provide('GCSDjimMolenkamp.GpsPopoverViewDelegate');

/**
 * Djim Molenkamp
 * Changed the functionality of this script to include more parameters
 * and using a filtered GPS position rather than raw data from the GPS
 */

/**
 * @param {{mavlinkSrc: GCSDjimMolenkamp.MavlinkAPI, el: jQuery}} properties View
 *     properties.
 * @constructor
 * @extends {Backbone.View}
 */
GCSDjimMolenkamp.GpsPopoverViewDelegate = function(properties) {
  this.popoverTitle = 'GPS Info';
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.GpsPopoverViewDelegate , Backbone.View);

GCSDjimMolenkamp.GpsPopoverViewDelegate.prototype.initialize = function() {
  var mavlink = this.options['mavlinkSrc'];
  this.gpsraw = mavlink.subscribe('GPS_RAW_INT', this.render, this);
  this.gps = mavlink.subscribe('GLOBAL_POSITION_INT', this.render, this);
};

GCSDjimMolenkamp.GpsPopoverViewDelegate.prototype.popoverCreated = function(el) {
  this.$el = el;
  this.$el.find('.popover-title').text(this.popoverTitle);
  this.render();
};

GCSDjimMolenkamp.GpsPopoverViewDelegate.prototype.popoverDestroyed = function() {
  this.$el = null;
};

GCSDjimMolenkamp.GpsPopoverViewDelegate.prototype.render = function() {
  if (this.$el) {

    var lat = (this.gps.get('lat') / 10e6).toFixed(7);
    var lon = (this.gps.get('lon') / 10e6).toFixed(7);
    var visible = (this.gpsraw.get('satellites_visible')).toString();
	var alt = (this.gpsraw.get('alt') / 1000).toFixed(1);
      
	var content = ('Satellites: ' + visible + '<br /> Coordinates: ' + lat + ', ' + lon + '<br /> Absolute Altitude: ' + alt + 'm');
    
    var eph = this.gpsraw.get('eph');
    if (typeof eph != 'undefined' && eph != 65535) {
      content += ('<br />HDOP: ' + (eph / 100).toFixed(2) + 'm');
    }
    var epv = this.gpsraw.get('epv');
    if (typeof epv != 'undefined' && epv != 65535) {
      content += ('<br />VDOP: ' + (epv / 100).toFixed(2) + 'm');
    }
	this.$el.find('.popover-content').html(content);
  }
};

