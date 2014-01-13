goog.provide('GCSDjimMolenkamp.VehicleLeafletPosition');



/**
 * Simple proxy to translate from GPS_RAW_INT mavproxy positions to
 * Leaflet's L.LatLng position.
 *
 * @param {Object} properties The model properties.
 * @constructor
 * @extends {Backbone.Model}
 */
GCSDjimMolenkamp.VehicleLeafletPosition = function(properties) {
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.VehicleLeafletPosition, Backbone.Model);


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.VehicleLeafletPosition.prototype.defaults = function() {
  return { 'position': null, 'heading': 0 };
};


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.VehicleLeafletPosition.prototype.initialize = function() {
  var mavlink = this.get('mavlinkSrc');
  this.vehicleGps = mavlink.subscribe(
      'GPS_RAW_INT',
      this.withVehicleGps,
      this);
  this.vehicleHead = mavlink.subscribe(
      'VFR_HUD',
      this.withVehicleHead,
      this);
};


/**
 * Handles GPS_RAW_INT mavlink messages.
 */
GCSDjimMolenkamp.VehicleLeafletPosition.prototype.withVehicleGps = function() {
  var veh = this.vehicleGps.toJSON();
  if (veh['lat'] === 0 && veh['lon'] === 0) return;
  this.set('position', new L.LatLng(veh['lat'] / 1.0e7, veh['lon'] / 1.0e7));
};


/**
 * Handles VFR_HUD mavlink messages.
 */
GCSDjimMolenkamp.VehicleLeafletPosition.prototype.withVehicleHead = function() {
  var h = this.vehicleHead.get('heading');
  this.set('heading', h);
};
