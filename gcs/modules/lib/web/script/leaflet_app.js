goog.require('GCSDjimMolenkamp.LeafletDroneIconModel');
goog.require('GCSDjimMolenkamp.MavlinkAPI');


$(function() {
  var mavlinkAPI = new GCSDjimMolenkamp.MavlinkAPI({ 'url': '/mavlink/' });

  var vehicle = new GCSDjimMolenkamp.VehicleLeafletPosition({
    'mavlinkSrc': mavlinkAPI
  });
  var leafletDroneIcon = new GCSDjimMolenkamp.LeafletDroneIconModel();
  var leafletProviders = new GCSDjimMolenkamp.LeafletProviders();

  var guideModel = new GCSDjimMolenkamp.GuideModel({ 'mavlinkSrc': mavlinkAPI });

  var mapView = new GCSDjimMolenkamp.LeafletView({
    'vehicle': vehicle,
    'provider': leafletProviders,
    'vehicleIcon': leafletDroneIcon,
    'guideModel': guideModel
  });

  setInterval(function() {
    mavlinkAPI.update();
  }, 100);

});
