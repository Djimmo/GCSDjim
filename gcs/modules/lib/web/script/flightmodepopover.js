
goog.provide('GCSDjimMolenkamp.FlightModePopoverViewDelegate');

/**
 * Flight mode popover Backbone view.
 * @param {{el: jQuery, modeModel: GCSDjimMolenkamp.FlightModeModel, commandModel:
 *     GCSDjimMolenkamp.CommandLongModel}} properties View properties.
 * @constructor
 * @extends {Backbone.View}
 */
GCSDjimMolenkamp.FlightModePopoverViewDelegate = function(properties) {
  this.popoverTitle = 'Flight Commands';
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.FlightModePopoverViewDelegate , Backbone.View);

/**
 * @override
 * @export
 */
GCSDjimMolenkamp.FlightModePopoverViewDelegate.prototype.initialize = function() {
  this.modeModel = this.options['modeModel'];
  this.commandModel = this.options['commandModel'];
};

GCSDjimMolenkamp.FlightModePopoverViewDelegate.prototype.popoverCreated = function(el) {
  this.$el = el;
  this.$el.find('.popover-title').text(this.popoverTitle);
  this.setupPopover();
};

GCSDjimMolenkamp.FlightModePopoverViewDelegate.prototype.popoverDestroyed = function() {
  this.$el = null;
  this.cleanupSubview('takeoffButtonView');
  this.cleanupSubview('armingButtonView');
  this.cleanupSubview('loiterButtonView');
  this.cleanupSubview('rtlButtonView');
  this.cleanupSubview('landButtonView');
};

GCSDjimMolenkamp.FlightModePopoverViewDelegate.prototype.setupPopover = function() {
  var takeoff =
      '<a class="btn btn-large" id="flightmode-btn-takeoff" href="#">Take Off</a>';
  var loiter =
      '<a class="btn btn-large" id="flightmode-btn-loiter" href="#">Loiter</a>';
  var rtl =
      '<a class="btn btn-large" id="flightmode-btn-rtl" href="#">RTL</a>';
  var land =
      '<a class="btn btn-large" id="flightmode-btn-land" href="#">Land</a>';
  var arm =
      '<p><a class="btn btn-large" id="flightmode-btn-arm" href="#">Arm</a></p><br />';

  this.$el.find('.popover-content').html(arm + '<br />' + takeoff + loiter + rtl + land);

  this.armingButtonView = new GCSDjimMolenkamp.ArmingButtonView({
    'el': $('#flightmode-btn-arm'),
    'model': this.modeModel
  });

  this.takeoffButtonView = new GCSDjimMolenkamp.CommandButtonView({
    'el': $('#flightmode-btn-takeoff'),
    'model': this.commandModel,
    'command': 'NAV_TAKEOFF'
  });
  
  this.loiterButtonView = new GCSDjimMolenkamp.CommandButtonView({
    'el': $('#flightmode-btn-loiter'),
    'model': this.commandModel,
    'command': 'NAV_LOITER_UNLIM'
  });

  this.rtlButtonView = new GCSDjimMolenkamp.CommandButtonView({
    'el': $('#flightmode-btn-rtl'),
    'model': this.commandModel,
    'command': 'NAV_RETURN_TO_LAUNCH'
  });

  this.landButtonView = new GCSDjimMolenkamp.CommandButtonView({
    'el': $('#flightmode-btn-land'),
    'model': this.commandModel,
    'command': 'NAV_LAND'
  });
};

GCSDjimMolenkamp.FlightModePopoverViewDelegate.prototype.cleanupSubview = function (subviewname) {
  if (this[subviewname]) {
    this[subviewname].remove();
    this[subviewname] = null;
  }
};
