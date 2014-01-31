goog.require('MineGCS.LeafletDroneIconModel');
goog.require('MineGCS.MavlinkAPI');


$(function() {
  var mavlinkAPI = new MineGCS.MavlinkAPI({ 'url': '/mavlink/' });

  var vehicle = new MineGCS.VehicleLeafletPosition({
    'mavlinkSrc': mavlinkAPI
  });
  var leafletDroneIcon = new MineGCS.LeafletDroneIconModel();
  var leafletProviders = new MineGCS.LeafletProviders();

  var guideModel = new MineGCS.GuideModel({ 'mavlinkSrc': mavlinkAPI });

  var mapView = new MineGCS.LeafletView({
    'vehicle': vehicle,
    'provider': leafletProviders,
    'vehicleIcon': leafletDroneIcon,
    'guideModel': guideModel
  });

  setInterval(function() {
    mavlinkAPI.update();
  }, 100);

});
