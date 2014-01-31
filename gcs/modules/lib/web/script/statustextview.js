goog.provide('MineGCS.StatustextView');



/**
 * Displays STATUSTEXT messages.
 * @param {{mavlinkSrc: MineGCS.MavlinkAPI}} attrs The model attributes.
 * @constructor
 * @extends {Backbone.View}
 */
MineGCS.StatustextView = function(attrs) {
  goog.base(this, attrs);
};
goog.inherits(MineGCS.StatustextView, Backbone.View);


/**
 * @override
 * @export
 */
MineGCS.StatustextView.prototype.initialize = function() {
  var mavlinkSrc = this.options['mavlinkSrc'];
  /** @type {!jQuery} */
  this.$el = $('#statustextview');
  /** @type {MineGCS.MavlinkMessage} */
  this.statusText = mavlinkSrc.subscribe('STATUSTEXT',
                                         this.onStatusTextChange, this);
  this.onStatusTextChange();
};


/**
 * Updates status text.
 */
MineGCS.StatustextView.prototype.onStatusTextChange = function() {
  clearTimeout(this.timeout);
  var el = this.$el;
  el.html(this.statusText.get('text'));
  el.css('padding', 10);
  this.timeout = setTimeout(function() {
    el.html('');
    el.css('padding', 0);
  }, 4000);
};
