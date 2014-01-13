goog.provide('GCSDjimMolenkamp.GuideModel');

goog.require('goog.json');



/**
 * The GUIDE-mode altitude model.
 *
 * @param {Object} properties The model properties.
 * @constructor
 * @extends {Backbone.Model}
 */
GCSDjimMolenkamp.GuideModel = function(properties) {
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.GuideModel, Backbone.Model);


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.GuideModel.prototype.defaults = function() {
  return {
    'alt': 20,
    'lat': null,
    'lon': null
  };
};


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.GuideModel.prototype.initialize = function() {
  var mavlink = this.get('mavlinkSrc');
  this.metaWaypointModel = mavlink.subscribe(
      'META_WAYPOINT', this.onMetaWaypointChange, this);
};


/**
 * Handles META_WAYPOINT mavlink messages.
 */
GCSDjimMolenkamp.GuideModel.prototype.onMetaWaypointChange = function() {
  var waypt = this.metaWaypointModel.get('waypoint');
  if (waypt) {
    this.set({ 'alt': waypt['alt'], 'lat': waypt['lat'], 'lon': waypt['lon'] });
  }
};


/**
 * Sets a new target waypoint.
 * @param {{lat: number, lon: number}} target The new target location.
 */
GCSDjimMolenkamp.GuideModel.prototype.setTarget = function(target) {
  this.set(target);
  this.send();
};


/**
 * Tells the server to set the current waypoint and switch to GUIDE
 * mode.
 */
GCSDjimMolenkamp.GuideModel.prototype.send = function() {
  var loc = {
    'lat': this.get('lat'),
    'lon': this.get('lon'),
    'alt': this.get('alt')
  };
  if (loc['lat'] !== null && loc['lon'] !== null && loc['alt'] !== null) {
    this.sendServer(loc);
  }
};


/**
 * Sends the new waypoint to the server.
 *
 * @param {Object} loc The new waypoint location.
 */
GCSDjimMolenkamp.GuideModel.prototype.sendServer = function(loc) {
  var req = goog.json.serialize({ 'command': 'FLYTO', 'location': loc });
  $.ajax({
    type: 'POST',
    url: '/guide',
    data: req
  });
};
