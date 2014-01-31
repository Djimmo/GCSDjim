goog.provide('MineGCS.LeafletPanControlView');
goog.provide('MineGCS.LeafletPanModel');



/**
 * @param {Object} properties The view properties.
 * @constructor
 * @extends {Backbone.View}
 */
MineGCS.LeafletPanControlView = function(properties) {
  goog.base(this, properties);
};
goog.inherits(MineGCS.LeafletPanControlView, Backbone.View);


/**
 * @override
 * @export
 */
MineGCS.LeafletPanControlView.prototype.initialize = function() {
  this.button = this.options['button'];
  this.icon = this.options['icon'];
  this.button.click(goog.bind(this.onClick, this));
  this.model.on('change:tracking', this.onTrackingChange, this);
  this.onTrackingChange();
};


/**
 * Handles click events on the auto-pan button.
 */
MineGCS.LeafletPanControlView.prototype.onClick = function() {
  if (this.model.get('tracking')) {
    this.model.set('tracking', false);
  } else {
    this.model.set('tracking', true);
  }
};


/**
 * Updates the button based on the auto-pan state.
 */
MineGCS.LeafletPanControlView.prototype.onTrackingChange = function() {
  if (this.model.get('tracking')) {
    this.button.addClass('btn-primary');
    this.icon.removeClass('icon-black');
    this.icon.addClass('icon-white');
  } else {
    this.button.removeClass('btn-primary');
    this.icon.removeClass('icon-white');
    this.icon.addClass('icon-black');
  }
};



/**
 * @param {Object} properties The model properties.
 * @constructor
 * @extends {Backbone.Model}
 */
MineGCS.LeafletPanModel = function(properties) {
  goog.base(this, properties);
};
goog.inherits(MineGCS.LeafletPanModel, Backbone.Model);


/**
 * @override
 * @export
 */
MineGCS.LeafletPanModel.prototype.defaults = function() {
  return {
    'initialized': false,
    'tracking': true,
    'center': undefined
  };
};


/**
 * @override
 * @export
 */
MineGCS.LeafletPanModel.prototype.initialize = function() {
  this.vehicle = this.get('vehicle');
  this.vehicle.on('change', this.onVehicleChange_, this);
};


/**
 * Handles changes to the vehicle model.
 * @private
 */
MineGCS.LeafletPanModel.prototype.onVehicleChange_ = function() {
  var pos = this.vehicle.get('position');
  if (!this.get('initialized')) {
    if (pos && pos.lat && pos.lng) {
      this.set({ 'center': pos, 'initialized': true });
    }
  } else if (this.get('tracking')) {
    if (pos && pos.lat && pos.lng) {
      this.set({ 'center': pos });
    }
  }
};


/**
 * Cancels tracking.  Called when the user drags the map.
 */
MineGCS.LeafletPanModel.prototype.cancelTracking = function() {
  this.set('tracking', false);
};
