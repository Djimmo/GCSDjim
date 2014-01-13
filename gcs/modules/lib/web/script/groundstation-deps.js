goog.addDependency("../../../../script/app.js", ['GCSDjimMolenkamp.App'], ['GCSDjimMolenkamp.AltSpeedView','GCSDjimMolenkamp.AppRouter', 'GCSDjimMolenkamp.BatteryButton', 'GCSDjimMolenkamp.CommStatusButtonView', 'GCSDjimMolenkamp.CommStatusPopoverViewDelegate', 'GCSDjimMolenkamp.CommStatusModel', 'GCSDjimMolenkamp.CommandLongModel', 'GCSDjimMolenkamp.FlightModeButtonView', 'GCSDjimMolenkamp.FlightModePopoverViewDelegate', 'GCSDjimMolenkamp.FlightModeModel', 'GCSDjimMolenkamp.GpsButtonView', 'GCSDjimMolenkamp.GpsPopoverViewDelegate', 'GCSDjimMolenkamp.GuideAltitudeView', 'GCSDjimMolenkamp.GuideModel', 'GCSDjimMolenkamp.LeafletDroneIconModel', 'GCSDjimMolenkamp.LeafletPanControlView', 'GCSDjimMolenkamp.LeafletPanModel', 'GCSDjimMolenkamp.LeafletProviders', 'GCSDjimMolenkamp.LeafletView', 'GCSDjimMolenkamp.MavlinkAPI', 'GCSDjimMolenkamp.ModeStringView', 'GCSDjimMolenkamp.PFD', 'GCSDjimMolenkamp.PFDSettingsModel', 'GCSDjimMolenkamp.PFDView', 'GCSDjimMolenkamp.PacketLossModel', 'GCSDjimMolenkamp.PopoverView', 'GCSDjimMolenkamp.RadioButtonPopoverView', 'GCSDjimMolenkamp.SettingsView', 'GCSDjimMolenkamp.StatustextView', 'GCSDjimMolenkamp.VehicleLeafletPosition', 'goog.Uri', 'goog.array', 'goog.async.AnimationDelay', 'goog.async.Throttle', 'goog.debug.Console', 'goog.debug.FpsDisplay', 'goog.dom', 'goog.net.jsloader']);
goog.addDependency("../../../../script/batterystatus.js", ['GCSDjimMolenkamp.BatteryButton'], []);
goog.addDependency("../../../../script/commstatus.js", ['GCSDjimMolenkamp.CommStatusButtonView', 'GCSDjimMolenkamp.CommStatusModel', 'GCSDjimMolenkamp.PacketLossModel'], []);
goog.addDependency("../../../../script/commstatuspopover.js", ['GCSDjimMolenkamp.CommStatusPopoverViewDelegate'], []);
goog.addDependency("../../../../script/fakemavlinkapi.js", ['GCSDjimMolenkamp.FakeVehicle'], ['goog.math']);
goog.addDependency("../../../../script/flightmode.js", ['GCSDjimMolenkamp.CommandLongModel', 'GCSDjimMolenkamp.FlightModeButtonView', 'GCSDjimMolenkamp.FlightModeModel'], ['GCSDjimMolenkamp.util', 'goog.json']);
goog.addDependency("../../../../script/flightmodepopover.js", ['GCSDjimMolenkamp.FlightModePopoverViewDelegate'], []);
goog.addDependency("../../../../script/gen-js/Calculator.js", [], []);
goog.addDependency("../../../../script/gen-js/SharedService.js", [], []);
goog.addDependency("../../../../script/gen-js/shared_types.js", [], []);
goog.addDependency("../../../../script/gen-js/tutorial_types.js", [], []);
goog.addDependency("../../../../script/gpsstatus.js", ['GCSDjimMolenkamp.GpsButtonView', 'GCSDjimMolenkamp.GpsTextView'], []);
goog.addDependency("../../../../script/gpsstatuspopover.js", ['GCSDjimMolenkamp.GpsPopoverViewDelegate'], []);
goog.addDependency("../../../../script/guidemodel.js", ['GCSDjimMolenkamp.GuideModel'], ['goog.json']);
goog.addDependency("../../../../script/guideview.js", ['GCSDjimMolenkamp.GuideAltitudeView'], []);
goog.addDependency("../../../../script/js/thrift.js", [], []);
goog.addDependency("../../../../script/leaflet_app.js", [], ['GCSDjimMolenkamp.LeafletDroneIconModel', 'GCSDjimMolenkamp.MavlinkAPI']);
goog.addDependency("../../../../script/leafletdroneicon.js", ['GCSDjimMolenkamp.LeafletDroneIconModel'], []);
goog.addDependency("../../../../script/leafletpanmodel.js", ['GCSDjimMolenkamp.LeafletPanControlView', 'GCSDjimMolenkamp.LeafletPanModel'], []);
goog.addDependency("../../../../script/leafletproviders.js", ['GCSDjimMolenkamp.LeafletProviders'], []);
goog.addDependency("../../../../script/leafletview.js", ['GCSDjimMolenkamp.LeafletView'], []);
goog.addDependency("../../../../script/mavelous-deps.js", [], []);
goog.addDependency("../../../../script/mavlinkapi.js", ['GCSDjimMolenkamp.MavlinkAPI', 'GCSDjimMolenkamp.MavlinkMessage'], ['GCSDjimMolenkamp.FakeVehicle', 'goog.debug.Logger']);
goog.addDependency("../../../../script/mavutil.js", ['GCSDjimMolenkamp.util'], ['goog.object']);
goog.addDependency("../../../../script/mission.js", ['mavelous', 'mavelous.Mission', 'mavelous.MissionItem', 'mavelous.MissionItemType'], ['goog.array', 'goog.asserts', 'goog.object']);
goog.addDependency("../../../../script/missionui.js", ['mavelous.ui', 'mavelous.ui.Input', 'mavelous.ui.Label', 'mavelous.ui.Mission', 'mavelous.ui.MissionItemRenderer', 'mavelous.ui.MissionRenderer'], ['goog.dom', 'goog.events', 'goog.events.Event', 'goog.ui.BidiInput', 'goog.ui.Checkbox', 'goog.ui.Checkbox.State', 'goog.ui.Container', 'goog.ui.ContainerRenderer', 'goog.ui.Control', 'goog.ui.ControlRenderer', 'goog.ui.FlatMenuButtonRenderer', 'goog.ui.Select', 'goog.ui.registry', 'mavelous.Mission', 'mavelous.MissionItem', 'mavelous.MissionItemType']);
goog.addDependency("../../../../script/modestringview.js", ['GCSDjimMolenkamp.ModeStringView'], ['GCSDjimMolenkamp.util']);
goog.addDependency("../../../../script/pfd.js", ['GCSDjimMolenkamp.ArtificialHorizon', 'GCSDjimMolenkamp.PFD', 'GCSDjimMolenkamp.Tape'], ['goog.dom']);
goog.addDependency("../../../../script/pfdsettings.js", ['GCSDjimMolenkamp.PFDSettingsModel'], ['goog.json']);
goog.addDependency("../../../../script/pfdview.js", ['GCSDjimMolenkamp.PFDView'], ['GCSDjimMolenkamp.PFD', 'GCSDjimMolenkamp.PFDSettingsModel']);
goog.addDependency("../../../../script/popoverview.js", ['GCSDjimMolenkamp.PopoverView', 'GCSDjimMolenkamp.SelectionModel'], []);
goog.addDependency("../../../../script/radiopopovers.js", ['GCSDjimMolenkamp.RadioButtonPopoverView'], []);
goog.addDependency("../../../../script/router.js", ['GCSDjimMolenkamp.AppRouter'], []);
goog.addDependency("../../../../script/settingsview.js", ['GCSDjimMolenkamp.SettingsView'], ['GCSDjimMolenkamp.PFDSettingsModel']);
goog.addDependency("../../../../script/statustextview.js", ['GCSDjimMolenkamp.StatustextView'], []);
goog.addDependency("../../../../script/vehicleleafletposition.js", ['GCSDjimMolenkamp.VehicleLeafletPosition'], []);

// Added by Djim
goog.addDependency("../../../../script/altspeed.js", ['GCSDjimMolenkamp.AltSpeedView'], []);
goog.addDependency("../../../../script/altspeedpopover.js", ['GCSDjimMolenkamp.AltSpeedPopoverViewDelegate'], []);
goog.addDependency("../../../../script/batterystatuspopover.js", ['GCSDjimMolenkamp.BatteryPopoverViewDelegate'], []);
goog.addDependency("../../../../script/distance.js", ['GCSDjimMolenkamp.DistanceView'], []);

// This file was autogenerated by calcdeps.py
