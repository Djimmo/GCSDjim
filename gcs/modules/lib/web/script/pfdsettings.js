goog.provide('MineGCS.PFDSettingsModel');

goog.require('goog.json');



/**
 * Primary flight display settings Backbone model.
 * @param {Object=} opt_properties The model properties.
 * @constructor
 * @extends {Backbone.Model}
 */
MineGCS.PFDSettingsModel = function(opt_properties) {
  goog.base(this, opt_properties);
};
goog.inherits(MineGCS.PFDSettingsModel, Backbone.Model);


/**
 * PFD position values.
 * @enum {number}
 */
MineGCS.PFDSettingsModel.Position = {
  TOPLEFT: 0,
  TOPRIGHT: 1,
  BOTTOMLEFT: 2,
  BOTTOMRIGHT: 3
};


/**
 * PFD size constants
 * @enum {number}
 */
MineGCS.PFDSettingsModel.Size = {
  STANDARD: 0,
  FULLSCREEN: 1,
  SMALL: 2,
  HIDDEN: 3
};


/**
 * @override
 * @export
 */
MineGCS.PFDSettingsModel.prototype.initialize = function() {
  this.bind('change', function() {
    this.writeToCookie();
  });
};


/**
 * @override
 * @export
 */
MineGCS.PFDSettingsModel.prototype.defaults = function() {
  var defaults = this.readFromCookie();
  if (defaults) {
    return {
      'position': (defaults['position'] ||
                   MineGCS.PFDSettingsModel.Position.TOPLEFT),
      'size': defaults['size'] || MineGCS.PFDSettingsModel.Size.STANDARD
    };
  } else {
    return {
      'position': MineGCS.PFDSettingsModel.Position.TOPLEFT,
      'size': MineGCS.PFDSettingsModel.Size.STANDARD
    };
  }
};


/**
 * Reads PFD settings from a cookie.
 * @return {?Object} The PFD settings.
 */
MineGCS.PFDSettingsModel.prototype.readFromCookie = function() {
  var cookieData = $.cookie('pfdSettings');
  if (cookieData) {
    window.console.log('cookieData');
    window.console.log(cookieData);
    try {
      return goog.json.parse(cookieData);
    }
    catch (error) {
      window.console.warn('Unable to parse pfdSettings cookie data:');
      window.console.warn(cookieData);
      return null;
    }
  } else {
    return null;
  }
};


/**
 * Writes PFD settings to a cookie.
 */
MineGCS.PFDSettingsModel.prototype.writeToCookie = function() {
  var settings = goog.json.serialize(this.toJSON());
  window.console.log('writeToCookie:');
  window.console.log(settings);
  $.cookie('pfdSettings', settings);
};
