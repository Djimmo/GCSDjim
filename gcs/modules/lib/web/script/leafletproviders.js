goog.provide('MineGCS.LeafletProviders');



/**
   * @param {Object=} opt_properties The model properties.
 * @constructor
 * @extends {Backbone.Model}
 */
MineGCS.LeafletProviders = function(opt_properties) {
  goog.base(this, opt_properties);
};
goog.inherits(MineGCS.LeafletProviders, Backbone.Model);


/**
 * Bing API key registered by Pat. Basic/public website
 */
MineGCS.LeafletProviders.bingKey = ('AnFxXUB376BgaEQMj947c43V45ipmMvdcoY-' +
                                     'TAE4-Y23mu1yFLHF0k2BMJP-MU1B');


/**
 * @override
 * @export
 */
MineGCS.LeafletProviders.prototype.defaults = function() {
  return {
    'provider': 'offline'
  };
};


/**
 * Creates a new provider.
 * @return {Object} The new provider.
 */
MineGCS.LeafletProviders.prototype.getProvider = function() {
  var name = this.get('provider');
  var p = MineGCS.LeafletProviders.Providers[name];
  return p.constructor();
};


/** @typedef {{description: String, constructor: Function}} */
MineGCS.LeafletProvider;


/**
 * Provider specs.
 * @type {Object}
 */
MineGCS.LeafletProviders.Providers = {
  // We don't need these providers since for this project the groundstation
  // is not connected to the internet! So I have only added offline maps
  // which are stored on the beaglebone itself. See below -- Djim
  // 
  // 'bing': {
    // description: 'Bing Satellite with Labels',
    // constructor: function() {
      // return new L.BingLayer(
          // MineGCS.LeafletProviders.bingKey,
          // {
            // type: 'AerialWithLabels',
            // maxZoom: 21
          // });
    // }
  // },
  // 'cloudmade': {
    // description: 'Cloudmade Road Map',
    // constructor: function() {
      // /* API Key registered by pat, 25 Nov 2012, for
       // * http://github.com/wiseman/mavelous
       // * Plan: Web Free */
      // var key = '420c27bae8514670a02a1684e8398d33';
      // var cloudmadeUrl = ('http://{s}.tile.cloudmade.com/' +
                          // key + '/997/256/{z}/{x}/{y}.png');
      // return new L.TileLayer(cloudmadeUrl, { maxZoom: 18 });
    // }
  // },
  // 'osm': {
    // description: 'OpenStreetMaps',
    // constructor: function() {
      // var osmUrl = ('http://{s}.tile.openstreetmap.org/' +
                    // '/{z}/{x}/{y}.png');
      // return new L.TileLayer(osmUrl, { maxZoom: 18 });
    // }
  // },
    'offline': {
    description: 'Offline Maps',
    constructor: function() {
      var offlineUrl = ('http://192.168.1.80:9999/' +
                    '/maps/{z}/gs_{x}_{y}_{z}.jpg');
      return new L.TileLayer(offlineUrl, { maxZoom: 20 });
    }
  }
};

