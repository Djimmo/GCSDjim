goog.provide('GCSDjimMolenkamp.StatustextView');



/**
 * Displays STATUSTEXT messages.
 * @param {{mavlinkSrc: GCSDjimMolenkamp.MavlinkAPI}} attrs The model attributes.
 * @constructor
 * @extends {Backbone.View}
 */
GCSDjimMolenkamp.StatustextView = function(attrs) {
  goog.base(this, attrs);
};
goog.inherits(GCSDjimMolenkamp.StatustextView, Backbone.View);


/**
 * @override
 * @export
 */
GCSDjimMolenkamp.StatustextView.prototype.initialize = function() {
  var mavlinkSrc = this.options['mavlinkSrc'];
  /** @type {!jQuery} */
  this.$el = $('#statustextview');
  /** @type {GCSDjimMolenkamp.MavlinkMessage} */
  this.statusText = mavlinkSrc.subscribe('STATUSTEXT',
                                         this.onStatusTextChange, this);
  this.onStatusTextChange();
};


/**
 * Updates status text.
 */
GCSDjimMolenkamp.StatustextView.prototype.onStatusTextChange = function() {
  clearTimeout(this.timeout);
  var el = this.$el;
  el.html(this.statusText.get('text'));
  el.css('padding', 10);
  this.timeout = setTimeout(function() {
    el.html('');
    el.css('padding', 0);
  }, 4000);
};
