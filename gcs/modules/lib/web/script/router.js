goog.provide('GCSDjimMolenkamp.AppRouter');



/**
 * The GCSDjimMolenkamp router.
 * @param {Object} options The router options.
 * @constructor
 * @extends {Backbone.Router}
 */
GCSDjimMolenkamp.AppRouter = function(options) {
  this.pfdSettingsModel = options['pfdSettingsModel'];
  this.routes = {
    'overview': 'route_overview',
    'fullpfd' : 'route_fullpfd',
    'maponly' : 'route_maponly'
  };
  goog.base(this, options);
};
goog.inherits(GCSDjimMolenkamp.AppRouter, Backbone.Router);


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.AppRouter.prototype.initialize = function(opt_options) {
  var navbar = {};
  _.each(this.routes, function(g, route) {
    var el = $('#navbar-' + route);
    if (el.length > 0) {
      navbar[route] = el;
    }
  });
  this.navbar = navbar;
};


/**
 * Show overview.
 * @export
 */
GCSDjimMolenkamp.AppRouter.prototype.route_overview = function() {
  this.setnavbar('overview');
  this.pfdSettingsModel.set({
    'size': GCSDjimMolenkamp.PFDSettingsModel.Size.HIDDEN
  });
};


/**
 * Show PFD only.
 * @export
 */
GCSDjimMolenkamp.AppRouter.prototype.route_fullpfd = function() {
  this.setnavbar('fullpfd');
  this.pfdSettingsModel.set({
    'size': GCSDjimMolenkamp.PFDSettingsModel.Size.FULLSCREEN
  });
};


/**
 * Show map only.
 * @export
 */
GCSDjimMolenkamp.AppRouter.prototype.route_maponly = function() {
  this.setnavbar('maponly');
  this.pfdSettingsModel.set({
    'size': GCSDjimMolenkamp.PFDSettingsModel.Size.STANDARD
  });
};


/**
 * Make the navbar only show selected item.
 *
 * @param {string} route The new route.
 */
GCSDjimMolenkamp.AppRouter.prototype.setnavbar = function(route) {
  _.each(this.navbar, function(li) {
    li.removeClass('active');
  });
  this.navbar[route].addClass('active');
};
