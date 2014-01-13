goog.provide('GCSDjimMolenkamp.CommandLongModel');
goog.provide('GCSDjimMolenkamp.FlightModeButtonView');
goog.provide('GCSDjimMolenkamp.FlightModeModel');

goog.require('GCSDjimMolenkamp.util');

goog.require('goog.json');



/**
 * Flight mode model.
 * @param {Object} properties The model properties.
 * @extends {Backbone.Model}
 * @constructor
 */
GCSDjimMolenkamp.FlightModeModel = function(properties) {
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.FlightModeModel, Backbone.Model);


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.FlightModeModel.prototype.defaults = function() {
  return {
    'armed': false,
    'arming': false,
    'disarming': false,
    'modestring': 'None'
  };
};


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.FlightModeModel.prototype.initialize = function() {
  var mavlinkSrc = this.get('mavlinkSrc');
  this.heartbeat = mavlinkSrc.subscribe('HEARTBEAT',
                                        this.onHeartbeat, this);
  this.on('change:armed', this.onChangeArmed, this);
  
  
};


/**
 * Handles HEARTBEAT mavlink messages.
 */
GCSDjimMolenkamp.FlightModeModel.prototype.onHeartbeat = function() {
  var modestring = GCSDjimMolenkamp.util.heartbeat.modestring(this.heartbeat);
  var armed = GCSDjimMolenkamp.util.heartbeat.armed(this.heartbeat);
  this.set({ 'armed': armed, 'modestring': modestring });
};


/**
 * Handles changes to the FlightModeModel.
 */
GCSDjimMolenkamp.FlightModeModel.prototype.onChangeArmed = function() {
  if (this.get('armed')) {
    if (this.get('arming')) {
      this.set('arming', false);
    }
  } else {
    if (this.get('disarming')) {
      this.set('disarming', false);
    }
  }
};


/**
 * Requests that motors be armed.
 */
GCSDjimMolenkamp.FlightModeModel.prototype.requestArm = function() {
  this.postArmRequest_(true);
  this.set('arming', true);
};


/**
 * Requests that motors be disarmed.
 */
GCSDjimMolenkamp.FlightModeModel.prototype.requestDisarm = function() {
  this.postArmRequest_(false);
  this.set('disarming', true);
};


/**
 * Sends a request to the server to arm or disarm the motors.
 * @param {boolean} armed Whether to arm the motors.
 * @private
 */
GCSDjimMolenkamp.FlightModeModel.prototype.postArmRequest_ = function(armed) {
  var setting;
  if (armed) {
    setting = 'ARM';
  } else {
    setting = 'DISARM';
  }
  $.ajax({
    type: 'POST',
    url: '/command_long',
    data: goog.json.serialize({
      command: 'COMPONENT_ARM_DISARM',
      component: 'SYSTEM_CONTROL',
      setting: setting
    })});
};



/**
 * Sends COMMAND_LONG mavlink message.
 * @param {{mavlinkSrc: GCSDjimMolenkamp.MavlinkAPI}} properties Model properties.
 * @constructor
 * @extends {Backbone.Model}
 */
GCSDjimMolenkamp.CommandLongModel = function(properties) {
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.CommandLongModel, Backbone.Model);


/**
 * Sends a command to the server.
 * @param {string} command The command to send.
 */
GCSDjimMolenkamp.CommandLongModel.prototype.post = function(command) {
  if (typeof command == 'string') {
    $.ajax({
      type: 'POST',
      url: '/command_long',
      data: goog.json.serialize({command: command})
    });
  } else {
    $.ajax({
      type: 'POST',
      url: '/command_long',
      data: goog.json.serialize(command)
    });
  }
};



/**
 * @constructor
 * @param {{el: jQuery, model: Backbone.Model}} properties View properties.
 * @extends {Backbone.View}
 */
GCSDjimMolenkamp.ArmingButtonView = function(properties) {
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.ArmingButtonView, Backbone.View);


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.ArmingButtonView.prototype.initialize = function() {
  this.model.on('change:armed change:arming change:disarming',
                this.onChange_, this);
  this.$el.click(goog.bind(this.onClick_, this));
  this.onChange_();
};


/**
 * Handles button clicks to arm/disarm the motors.
 * @private
 */
GCSDjimMolenkamp.ArmingButtonView.prototype.onClick_ = function() {
  if (this.model.get('armed')) {
    this.model.requestDisarm();
  } else {
    this.model.requestArm();
  }
};


/**
 * Handles changes in the model.
 * @private
 */
GCSDjimMolenkamp.ArmingButtonView.prototype.onChange_ = function() {
  this.$el.removeClass('btn-success btn-warning');
  if (this.model.get('armed')) {
    if (this.model.get('disarming')) {
      this.$el.html('Disarming...');
      this.$el.addClass('btn-warning');
    } else {
      this.$el.html('Click to Disarm');
      this.$el.addClass('btn-warning');
    }
  } else {
    if (this.model.get('arming')) {
      this.$el.html('Arming...');
      this.$el.addClass('btn-success');
    } else {
      this.$el.html('Click to Arm');
      this.$el.addClass('btn-success');
    }
  }
};



/**
 * @param {{el: jQuery, model: GCSDjimMolenkamp.CommandLongModel, command: string}}
 *     properties The view properties.
 * @constructor
 * @extends {Backbone.View}
 */
GCSDjimMolenkamp.CommandButtonView = function(properties) {
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.CommandButtonView, Backbone.View);


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.CommandButtonView.prototype.initialize = function() {
  this.command = this.options['command'];
  this.$el.click(goog.bind(this.onClick_, this));
};


/**
 * Handles button clicks.
 * @private
 */
GCSDjimMolenkamp.CommandButtonView.prototype.onClick_ = function() {
  this.model.post(this.command);
};



/**
 * Flight mode button Backbone view.
 * @param {{el: jQuery, modeModel: GCSDjimMolenkamp.FlightModeModel, commandModel:
 *     GCSDjimMolenkamp.CommandLongModel}} properties View properties.
 * @constructor
 * @extends {Backbone.View}
 */
GCSDjimMolenkamp.FlightModeButtonView = function(properties) {
  goog.base(this, properties);
};
goog.inherits(GCSDjimMolenkamp.FlightModeButtonView, Backbone.View);


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.FlightModeButtonView.prototype.initialize = function() {
  this.modeModel = this.options['modeModel'];
  this.$el = this.options['el'];
  this.modeModel.on('change', this.onChange_, this);
};


/**
 * Handles changes to the FlightModeModel.
 * @private
 */
GCSDjimMolenkamp.FlightModeButtonView.prototype.onChange_ = function() {
  this.$el.removeClass('btn-success btn-warning');
  if (this.modeModel.get('armed')) {
    this.$el.addClass('btn-success');
  } else {
    this.$el.addClass('btn-warning');
  }
  this.$el.html(this.modeModel.get('modestring'));
};


