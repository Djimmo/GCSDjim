goog.addDependency("../../../../script/app.js", ['MineGCS.App'], ['MineGCS.AltSpeedView','MineGCS.AppRouter', 'MineGCS.BatteryButton', 'MineGCS.CommStatusButtonView', 'MineGCS.CommStatusPopoverViewDelegate', 'MineGCS.CommStatusModel', 'MineGCS.CommandLongModel', 'MineGCS.FlightModeButtonView', 'MineGCS.FlightModePopoverViewDelegate', 'MineGCS.FlightModeModel', 'MineGCS.GpsButtonView', 'MineGCS.GpsPopoverViewDelegate', 'MineGCS.GuideAltitudeView', 'MineGCS.GuideModel', 'MineGCS.LeafletDroneIconModel', 'MineGCS.LeafletPanControlView', 'MineGCS.LeafletPanModel', 'MineGCS.LeafletProviders', 'MineGCS.LeafletView', 'MineGCS.MavlinkAPI', 'MineGCS.ModeStringView', 'MineGCS.PFD', 'MineGCS.PFDSettingsModel', 'MineGCS.PFDView', 'MineGCS.PacketLossModel', 'MineGCS.PopoverView', 'MineGCS.RadioButtonPopoverView', 'MineGCS.SettingsView', 'MineGCS.StatustextView', 'MineGCS.VehicleLeafletPosition', 'goog.Uri', 'goog.array', 'goog.async.AnimationDelay', 'goog.async.Throttle', 'goog.debug.Console', 'goog.debug.FpsDisplay', 'goog.dom', 'goog.net.jsloader']);
goog.addDependency("../../../../script/batterystatus.js", ['MineGCS.BatteryButton'], []);
goog.addDependency("../../../../script/commstatus.js", ['MineGCS.CommStatusButtonView', 'MineGCS.CommStatusModel', 'MineGCS.PacketLossModel'], []);
goog.addDependency("../../../../script/commstatuspopover.js", ['MineGCS.CommStatusPopoverViewDelegate'], []);
goog.addDependency("../../../../script/fakemavlinkapi.js", ['MineGCS.FakeVehicle'], ['goog.math']);
goog.addDependency("../../../../script/flightmode.js", ['MineGCS.CommandLongModel', 'MineGCS.FlightModeButtonView', 'MineGCS.FlightModeModel'], ['MineGCS.util', 'goog.json']);
goog.addDependency("../../../../script/flightmodepopover.js", ['MineGCS.FlightModePopoverViewDelegate'], []);
goog.addDependency("../../../../script/gen-js/Calculator.js", [], []);
goog.addDependency("../../../../script/gen-js/SharedService.js", [], []);
goog.addDependency("../../../../script/gen-js/shared_types.js", [], []);
goog.addDependency("../../../../script/gen-js/tutorial_types.js", [], []);
goog.addDependency("../../../../script/gpsstatus.js", ['MineGCS.GpsButtonView', 'MineGCS.GpsTextView'], []);
goog.addDependency("../../../../script/gpsstatuspopover.js", ['MineGCS.GpsPopoverViewDelegate'], []);
goog.addDependency("../../../../script/guidemodel.js", ['MineGCS.GuideModel'], ['goog.json']);
goog.addDependency("../../../../script/guideview.js", ['MineGCS.GuideAltitudeView'], []);
goog.addDependency("../../../../script/js/thrift.js", [], []);
goog.addDependency("../../../../script/leaflet_app.js", [], ['MineGCS.LeafletDroneIconModel', 'MineGCS.MavlinkAPI']);
goog.addDependency("../../../../script/leafletdroneicon.js", ['MineGCS.LeafletDroneIconModel'], []);
goog.addDependency("../../../../script/leafletpanmodel.js", ['MineGCS.LeafletPanControlView', 'MineGCS.LeafletPanModel'], []);
goog.addDependency("../../../../script/leafletproviders.js", ['MineGCS.LeafletProviders'], []);
goog.addDependency("../../../../script/leafletview.js", ['MineGCS.LeafletView'], []);
goog.addDependency("../../../../script/mavelous-deps.js", [], []);
goog.addDependency("../../../../script/mavlinkapi.js", ['MineGCS.MavlinkAPI', 'MineGCS.MavlinkMessage'], ['MineGCS.FakeVehicle', 'goog.debug.Logger']);
goog.addDependency("../../../../script/mavutil.js", ['MineGCS.util'], ['goog.object']);
goog.addDependency("../../../../script/mission.js", ['mavelous', 'mavelous.Mission', 'mavelous.MissionItem', 'mavelous.MissionItemType'], ['goog.array', 'goog.asserts', 'goog.object']);
goog.addDependency("../../../../script/missionui.js", ['mavelous.ui', 'mavelous.ui.Input', 'mavelous.ui.Label', 'mavelous.ui.Mission', 'mavelous.ui.MissionItemRenderer', 'mavelous.ui.MissionRenderer'], ['goog.dom', 'goog.events', 'goog.events.Event', 'goog.ui.BidiInput', 'goog.ui.Checkbox', 'goog.ui.Checkbox.State', 'goog.ui.Container', 'goog.ui.ContainerRenderer', 'goog.ui.Control', 'goog.ui.ControlRenderer', 'goog.ui.FlatMenuButtonRenderer', 'goog.ui.Select', 'goog.ui.registry', 'mavelous.Mission', 'mavelous.MissionItem', 'mavelous.MissionItemType']);
goog.addDependency("../../../../script/modestringview.js", ['MineGCS.ModeStringView'], ['MineGCS.util']);
goog.addDependency("../../../../script/pfd.js", ['MineGCS.ArtificialHorizon', 'MineGCS.PFD', 'MineGCS.Tape'], ['goog.dom']);
goog.addDependency("../../../../script/pfdsettings.js", ['MineGCS.PFDSettingsModel'], ['goog.json']);
goog.addDependency("../../../../script/pfdview.js", ['MineGCS.PFDView'], ['MineGCS.PFD', 'MineGCS.PFDSettingsModel']);
goog.addDependency("../../../../script/popoverview.js", ['MineGCS.PopoverView', 'MineGCS.SelectionModel'], []);
goog.addDependency("../../../../script/radiopopovers.js", ['MineGCS.RadioButtonPopoverView'], []);
goog.addDependency("../../../../script/router.js", ['MineGCS.AppRouter'], []);
goog.addDependency("../../../../script/settingsview.js", ['MineGCS.SettingsView'], ['MineGCS.PFDSettingsModel']);
goog.addDependency("../../../../script/statustextview.js", ['MineGCS.StatustextView'], []);
goog.addDependency("../../../../script/vehicleleafletposition.js", ['MineGCS.VehicleLeafletPosition'], []);

// Added by Djim
goog.addDependency("../../../../script/altspeed.js", ['MineGCS.AltSpeedView'], []);
goog.addDependency("../../../../script/altspeedpopover.js", ['MineGCS.AltSpeedPopoverViewDelegate'], []);
goog.addDependency("../../../../script/batterystatuspopover.js", ['MineGCS.BatteryPopoverViewDelegate'], []);
goog.addDependency("../../../../script/distance.js", ['MineGCS.DistanceView'], []);

// This file was autogenerated by calcdeps.py
