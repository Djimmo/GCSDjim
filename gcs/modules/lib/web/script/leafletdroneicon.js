goog.provide('MineGCS.LeafletDroneIconModel');



/**
 * Keeps track of which icon to use for the drone.
 *
 * @param {Object=} opt_properties Model properties.
 * @constructor
 * @extends {Backbone.Model}
 */
MineGCS.LeafletDroneIconModel = function(opt_properties) {
  goog.base(this, opt_properties);
};
goog.inherits(MineGCS.LeafletDroneIconModel, Backbone.Model);


/**
 * @override
 * @export
 */
MineGCS.LeafletDroneIconModel.prototype.defaults = function() {
  return {
    'icon': 'quad'
  };
};


/**
 * Returns the current icon object.
 * @return {Object} The current icon object.
 */
MineGCS.LeafletDroneIconModel.prototype.getIcon = function() {
  var name = this.get('icon');
  var iconSpec = MineGCS.LeafletDroneIconModel.Icons[name];
  return new iconSpec.constructor();
};


/**
 * Possible icons
 * @enum {Object}
 */
MineGCS.LeafletDroneIconModel.Icons = {
  'quad': {
    description: 'Quadcopter',
    constructor: L.Icon.extend({options: {
      'iconUrl': 'image/quad.png',
      'shadowUrl': null,
      'iconAnchor': new L.Point(37, 37),
      'iconSize': new L.Point(75, 75)
    }})
  }
};
