goog.provide('MineGCS.CommStatusButtonView');
goog.provide('MineGCS.CommStatusModel');
goog.provide('MineGCS.PacketLossModel');

/**
 * Communication status Backbone model.
 * @param {{mavlinkSrc: MineGCS.MavlinkAPI}} properties The model properties.
 * @constructor
 * @extends {Backbone.Model}
 */
MineGCS.CommStatusModel = function(properties) {
  this.SERVER_TIMEOUT_INTERVAL = 3000;
  this.HEARTBEAT_TIMEOUT_INTERVAL = 2000;
  goog.base(this, properties);
};
goog.inherits(MineGCS.CommStatusModel, Backbone.Model);


/**
 * Communications status state.
 * @enum {number}
 */
MineGCS.CommStatusModel.State = {
  UNINITIALIZED: 0,
  OK: 1,
  TIMED_OUT_ONCE: 2,
  TIMED_OUT_MANY: 3,
  ERROR: 4
};


/**
 * @override
 * @export
 */
MineGCS.CommStatusModel.prototype.defaults = function() {
  return {
    'mav': MineGCS.CommStatusModel.State.UNINITIALIZED,
    'server': MineGCS.CommStatusModel.State.UNINITIALIZED
  };
};


/**
 * @override
 * @export
 */
MineGCS.CommStatusModel.prototype.initialize = function() {
  /* Only initialize the server.
   * Mav is uninitialized until first heartbeat. */
  var mavlink = this.get('mavlinkSrc');
  mavlink.subscribe('HEARTBEAT', this.onHeartbeat, this);
  mavlink.on('gotServerResponse', this.onServerSuccess, this);
  mavlink.on('gotServerError', this.onServerError, this);
  this.resetServerTimeout();
};


/**
 * Handles HEARTBEAT mavlink messages.
 */
MineGCS.CommStatusModel.prototype.onHeartbeat = function() {
  this.set('mav', MineGCS.CommStatusModel.State.OK);
  this.resetHeartbeatTimeout();
};


/**
 * Resets the HEARTBEAT watchdog timer.
 */
MineGCS.CommStatusModel.prototype.resetHeartbeatTimeout = function() {
  var self = this;
  clearTimeout(this.heartbeatTimeout);
  this.heartbeatTimeout = setTimeout(
      function() {
        self.onHeartbeatTimeout();
      },
      this.HEARTBEAT_TIMEOUT_INTERVAL);
};


/**
 * Fires if we haven't received a HEARTBEAT message in
 * HEARTBEAT_TIMEOUT_INTERVAL ms.
 */
MineGCS.CommStatusModel.prototype.onHeartbeatTimeout = function() {
  var mavstat = this.get('mav');
  if (mavstat === MineGCS.CommStatusModel.State.OK) {
    this.set('mav', MineGCS.CommStatusModel.State.TIMED_OUT_ONCE);
  } else if (mavstat === MineGCS.CommStatusModel.State.TIMED_OUT_ONCE) {
    this.set('mav', MineGCS.CommStatusModel.State.TIMED_OUT_MANY);
  }
  /* Do nothing if uninitialized. */
  this.resetHeartbeatTimeout();
};


/**
 * Called if we get any non-error response from the server.
 */
MineGCS.CommStatusModel.prototype.onServerSuccess = function() {
  this.set('server', MineGCS.CommStatusModel.State.OK);
  this.resetServerTimeout();
};


/**
 * Called if we get a server error.
 */
MineGCS.CommStatusModel.prototype.onServerError = function() {
  this.set('server', MineGCS.CommStatusModel.State.ERROR);
};


/**
 * Resets the server comm watchdog timer.
 */
MineGCS.CommStatusModel.prototype.resetServerTimeout = function() {
  var self = this;
  clearTimeout(this.serverTimeout);
  this.serverTimeout = setTimeout(
      function() { self.onServerTimeout(); },
      this.SERVER_TIMEOUT_INTERVAL);
};


/**
 * Fires if the server comm watchdog timer fires.
 */
MineGCS.CommStatusModel.prototype.onServerTimeout = function() {
  var serverstat = this.get('server');
  if (serverstat === MineGCS.CommStatusModel.State.OK) {
    this.set('server', MineGCS.CommStatusModel.State.TIMED_OUT_ONCE);
  } else if (serverstat === MineGCS.CommStatusModel.State.TIMED_OUT_ONCE) {
    this.set('server', MineGCS.CommStatusModel.State.TIMED_OUT_MANY);
  }
  /* Do nothing if there is an error or uninitialized. */
  this.resetServerTimeout();
};



/**
 * Packet loss Backbone model.
 * @param {Object} properties The model properties.
 * @constructor
 * @extends {Backbone.Model}
 */
MineGCS.PacketLossModel = function(properties) {
  this.period = 10; /* period should not be changed after initialization. */
  goog.base(this, properties);
};
goog.inherits(MineGCS.PacketLossModel, Backbone.Model);


/**
 * @override
 * @export
 */
MineGCS.PacketLossModel.prototype.defaults = function() {
  return {
    'history': [],
    'current': -1
  };
};


/**
 * @override
 * @export
 */
MineGCS.PacketLossModel.prototype.initialize = function() {
  this.metalinkquality = this.get('mavlinkSrc').subscribe(
      'META_LINKQUALITY', this.onMessage, this);
};


/**
 * Handles META_LINKQUALITY mavlink messages.
 */
MineGCS.PacketLossModel.prototype.onMessage = function() {
  var history = this.get('history');
  var current = this.get('current');
  var latest = this.metalinkquality.toJSON();
  var next = (current + 1) % (this.period + 1);
  history[next] = latest;
  this.set('history', history);
  this.set('current', next);
};


/**
 * Computes the change in packet comms stats since the last packet.
 * @return {?Object} The packet comms stats.
 */
MineGCS.PacketLossModel.prototype.getDelta = function() {
  var history = this.get('history');
  var current = this.get('current');
  /* current is -1 when we dont yet have info from server. */
  if (current < 0) {
    return null;
  }
  var nextposition = history[(current + 1) % (this.period + 1)];
  if (nextposition) {
    return this.diff(history[current], nextposition, this.period);
  } else {
    return this.diff(history[current], history[0], current);
  }
};


/**
 * Computes the raw change in packet comms stats.
 * @param {Object} latest The most recent META_LINKQUALITY message.
 * @param {Object} compare The previous META_LINKQUALITY message.
 * @param {?} period The period between the two messages.
 * @return {Object} The packet comms stats.
 */
MineGCS.PacketLossModel.prototype.diff = function(latest, compare, period) {
  return {
    'master_in': latest['master_in'] - compare['master_in'],
    'master_out': latest['master_out'] - compare['master_out'],
    'mav_loss': latest['mav_loss'] - compare['mav_loss'],
    'period': period };
};



/**
 * Communication status Backbone view.
 * @param {Object} properties The view properties.
 * @constructor
 * @extends {Backbone.View}
 */
MineGCS.CommStatusButtonView = function(properties) {
  goog.base(this, properties);
};
goog.inherits(MineGCS.CommStatusButtonView, Backbone.View);


/**
 * @override
 * @export
 */
MineGCS.CommStatusButtonView.prototype.initialize = function() {
  this.commStatusModel = this.options['commStatusModel'];
  this.commStatusModel.bind('change', this.buttonRender, this);
};


/**
 * Renders the button.  Called when the packet loss model changes.
 */
MineGCS.CommStatusButtonView.prototype.buttonRender = function() {
  var csm = this.commStatusModel;
  var state = csm.toJSON();
  var server = state['server'];
  var mav = state['mav'];
  var UNINITIALIZED = MineGCS.CommStatusModel.State.UNINITIALIZED;
  var OK = MineGCS.CommStatusModel.State.OK;
  var TIMED_OUT_ONCE = MineGCS.CommStatusModel.State.TIMED_OUT_ONCE;
  var TIMED_OUT_MANY = MineGCS.CommStatusModel.State.TIMED_OUT_MANY;
  var ERROR = MineGCS.CommStatusModel.State.ERROR;

  if (server === OK && mav === OK) {
    this.setButton(OK);
  } else if (server === UNINITIALIZED || mav === UNINITIALIZED) {
    this.setButton(UNINITIALIZED);
  } else if (server === TIMED_OUT_MANY || mav === TIMED_OUT_MANY) {
    this.setButton(TIMED_OUT_MANY);
  } else if (server === TIMED_OUT_ONCE || mav === TIMED_OUT_ONCE) {
    this.setButton(TIMED_OUT_ONCE);
  } else if (server === ERROR || mav === ERROR) {
    this.setButton(ERROR);
  } else {
    goog.asserts.assert(false, 'Unknown comm status: ' + server + '/' + mav);
  }
};


/**
 * Updates the button view to reflect the communications state.
 * @param {MineGCS.CommStatusModel.State} state The communications state.
 */
MineGCS.CommStatusButtonView.prototype.setButton = function(state) {
  var csm = this.commStatusModel;
  this.$el.removeClass('btn-success btn-danger ' +
                       'btn-warning btn-inverse ');
  var html = 'Link';
  var lclass = 'btn-inverse';
  if (state === MineGCS.CommStatusModel.State.UNINITIALIZED) {
    lclass = 'btn-inverse';
    html = 'Link';
  } else if (state === MineGCS.CommStatusModel.State.OK) {
    lclass = 'btn-success';
    html = 'Link';
  } else if (state === MineGCS.CommStatusModel.State.TIMED_OUT_ONCE) {
    lclass = 'btn-warning';
    html = 'Link';
  } else if (state === MineGCS.CommStatusModel.State.TIMED_OUT_MANY) {
    lclass = 'btn-danger';
    html = 'Link';
  } else {
    lclass = 'btn-danger';
    html = 'Link';
  }
  this.$el.addClass(lclass);
  html = '<span class="hidden-phone">' + html + '</span>';
  html += '<i class="icon-signal icon-white visible-phone"></i>';
  this.$el.html(html);
};


