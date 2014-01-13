goog.provide('GCSDjimMolenkamp.ModeStringView');

goog.require('GCSDjimMolenkamp.util');



/**
 * Displays the vehicle armed/disarmed mode.
 * @param {Object} properties The view properties.
 * @constructor
 * @extends {Backbone.View}
 */
GCSDjimMolenkamp.ModeStringView = function(properties) {
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.ModeStringView, Backbone.View);


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.ModeStringView.prototype.initialize = function() {
  var mavlinkSrc = this.options['mavlinkSrc'];
  this.$el = this.options['el'];
  this.heartbeat = mavlinkSrc.subscribe('HEARTBEAT',
                                        this.onHeartbeat, this);
};


/**
 * Handles HEARTBEAT messages.
 */
GCSDjimMolenkamp.ModeStringView.prototype.onHeartbeat = function() {
  var modestring = GCSDjimMolenkamp.util.heartbeat.modestring(this.heartbeat);
  var armed = GCSDjimMolenkamp.util.heartbeat.armed(this.heartbeat);
  if (modestring) {
    if (armed) {
      modestring += ' <span class="ok">ARMED</span>';
    } else {
      modestring += ' <span class="slow">DISARMED</span>';
    }
    this.$el.html(modestring);
  }
};
