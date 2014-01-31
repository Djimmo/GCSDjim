goog.provide('MineGCS.ModeStringView');

goog.require('MineGCS.util');



/**
 * Displays the vehicle armed/disarmed mode.
 * @param {Object} properties The view properties.
 * @constructor
 * @extends {Backbone.View}
 */
MineGCS.ModeStringView = function(properties) {
  goog.base(this, properties);
};
goog.inherits(MineGCS.ModeStringView, Backbone.View);


/**
 * @override
 * @export
 */
MineGCS.ModeStringView.prototype.initialize = function() {
  var mavlinkSrc = this.options['mavlinkSrc'];
  this.$el = this.options['el'];
  this.heartbeat = mavlinkSrc.subscribe('HEARTBEAT',
                                        this.onHeartbeat, this);
};


/**
 * Handles HEARTBEAT messages.
 */
MineGCS.ModeStringView.prototype.onHeartbeat = function() {
  var modestring = MineGCS.util.heartbeat.modestring(this.heartbeat);
  var armed = MineGCS.util.heartbeat.armed(this.heartbeat);
  if (modestring) {
    if (armed) {
      modestring += ' <span class="ok">ARMED</span>';
    } else {
      modestring += ' <span class="slow">DISARMED</span>';
    }
    this.$el.html(modestring);
  }
};
