
goog.provide('MineGCS.FlightModePopoverViewDelegate');

/**
 * Flight mode popover Backbone view.
 * @param {{el: jQuery, modeModel: MineGCS.FlightModeModel, commandModel:
 *     MineGCS.CommandLongModel}} properties View properties.
 * @constructor
 * @extends {Backbone.View}
 */
MineGCS.FlightModePopoverViewDelegate = function(properties) {
  this.popoverTitle = 'Flight Commands';
  goog.base(this, properties);
};
goog.inherits(MineGCS.FlightModePopoverViewDelegate , Backbone.View);

/**
 * @override
 * @export
 */
MineGCS.FlightModePopoverViewDelegate.prototype.initialize = function() {
  this.modeModel = this.options['modeModel'];
  this.commandModel = this.options['commandModel'];
};

MineGCS.FlightModePopoverViewDelegate.prototype.popoverCreated = function(el) {
  this.$el = el;
  this.$el.find('.popover-title').text(this.popoverTitle);
  this.setupPopover();
};

MineGCS.FlightModePopoverViewDelegate.prototype.popoverDestroyed = function() {
  /* this.$el = null; */
/*   this.cleanupSubview('takeoffButtonView'); */
  this.cleanupSubview('armingButtonView');
/*   this.cleanupSubview('loiterButtonView');
  this.cleanupSubview('rtlButtonView');
  this.cleanupSubview('landButtonView'); */
};

MineGCS.FlightModePopoverViewDelegate.prototype.setupPopover = function() {
  var takeoff =
      '<a class="btn btn-large" id="flightmode-btn-takeoff" href="#">Take Off</a>';
  var loiter =
      '<a class="btn btn-large" id="flightmode-btn-loiter" href="#">Loiter</a>';
  var rtl =
      '<a class="btn btn-large" id="flightmode-btn-rtl" href="#">RTL</a>';
  var land =
      '<a class="btn btn-large" id="flightmode-btn-land" href="#">Land</a>';
  var arm =
      '<center><p><a class="btn btn-large" id="flightmode-btn-arm" href="#">Arm</a></p></center>'; /* <br />'; */

  this.$el.find('.popover-content').html(arm); /* + '<br />' + takeoff + loiter + rtl + land); */

  this.armingButtonView = new MineGCS.ArmingButtonView({
    'el': $('#flightmode-btn-arm'),
    'model': this.modeModel
  });

  this.takeoffButtonView = new MineGCS.CommandButtonView({
    'el': $('#flightmode-btn-takeoff'),
    'model': this.commandModel,
    'command': 'NAV_TAKEOFF'
  });
  
  this.loiterButtonView = new MineGCS.CommandButtonView({
    'el': $('#flightmode-btn-loiter'),
    'model': this.commandModel,
    'command': 'NAV_LOITER_UNLIM'
  });

  this.rtlButtonView = new MineGCS.CommandButtonView({
    'el': $('#flightmode-btn-rtl'),
    'model': this.commandModel,
    'command': 'NAV_RETURN_TO_LAUNCH'
  });

  this.landButtonView = new MineGCS.CommandButtonView({
    'el': $('#flightmode-btn-land'),
    'model': this.commandModel,
    'command': 'NAV_LAND'
  });
};

MineGCS.FlightModePopoverViewDelegate.prototype.cleanupSubview = function (subviewname) {
  if (this[subviewname]) {
    this[subviewname].remove();
    this[subviewname] = null;
  }
};
