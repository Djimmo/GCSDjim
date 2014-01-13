goog.provide('GCSDjimMolenkamp.App');

goog.require('GCSDjimMolenkamp.AltSpeedView');						// Djim
goog.require('GCSDjimMolenkamp.AltSpeedPopoverViewDelegate');		// Djim
goog.require('GCSDjimMolenkamp.AppRouter');
goog.require('GCSDjimMolenkamp.BatteryButton');
goog.require('GCSDjimMolenkamp.BatteryPopoverViewDelegate');		// Djim
goog.require('GCSDjimMolenkamp.CommStatusButtonView');
goog.require('GCSDjimMolenkamp.CommStatusPopoverViewDelegate');
goog.require('GCSDjimMolenkamp.CommStatusModel');
goog.require('GCSDjimMolenkamp.CommandLongModel');
goog.require('GCSDjimMolenkamp.DistanceView');						// Djim
goog.require('GCSDjimMolenkamp.FlightModeButtonView');
goog.require('GCSDjimMolenkamp.FlightModePopoverViewDelegate');
goog.require('GCSDjimMolenkamp.FlightModeModel');
goog.require('GCSDjimMolenkamp.GpsButtonView');
goog.require('GCSDjimMolenkamp.GpsPopoverViewDelegate');
goog.require('GCSDjimMolenkamp.GuideAltitudeView');
goog.require('GCSDjimMolenkamp.GuideModel');
goog.require('GCSDjimMolenkamp.LeafletDroneIconModel');
goog.require('GCSDjimMolenkamp.LeafletPanControlView');
goog.require('GCSDjimMolenkamp.LeafletPanModel');
goog.require('GCSDjimMolenkamp.LeafletProviders');
goog.require('GCSDjimMolenkamp.LeafletView');
goog.require('GCSDjimMolenkamp.MavlinkAPI');
goog.require('GCSDjimMolenkamp.ModeStringView');
goog.require('GCSDjimMolenkamp.PFD');
goog.require('GCSDjimMolenkamp.PFDSettingsModel');
goog.require('GCSDjimMolenkamp.PFDView');
goog.require('GCSDjimMolenkamp.PacketLossModel');
goog.require('GCSDjimMolenkamp.PopoverView');
goog.require('GCSDjimMolenkamp.RadioButtonPopoverView');
goog.require('GCSDjimMolenkamp.SettingsView');
goog.require('GCSDjimMolenkamp.StatustextView');
goog.require('GCSDjimMolenkamp.VehicleLeafletPosition');

goog.require('goog.Uri');
goog.require('goog.array');
goog.require('goog.async.AnimationDelay');
goog.require('goog.async.Throttle');
goog.require('goog.debug.Console');
goog.require('goog.debug.FpsDisplay');
goog.require('goog.dom');
goog.require('goog.net.jsloader');



/**
 * GCSDjimMolenkamp App object.
 *
 * @constructor
 */
GCSDjimMolenkamp.App = function() {
};


/**
 * Initializes and starts the app.
 */
GCSDjimMolenkamp.App.prototype.start = function() {
  var c = new goog.debug.Console();
  c.setCapturing(true);

  var uri = new goog.Uri(window.location.href);
  this.mavlinkAPI = new GCSDjimMolenkamp.MavlinkAPI({ 'url': '/mavlink/' });
  /* If we see "offline" query parameter in the URL, enable offline
   * mode. */
  if (goog.isDef(uri.getParameterValue('offline'))) {
    this.mavlinkAPI.useOfflineMode();
  }

  /* Check whether we're in debug mode. */
  var debugValue = uri.getParameterValue('debug');
  if (goog.isDef(debugValue)) {
    window.console.log('Enabling debug mode');
    /* ?debug with or without a value is enough to trigger fps display. */
    var fpsNode = document.getElementById('fps');
    var fpsValueNode = goog.dom.createDom('span', {'id': 'fpsvalue'});
    goog.dom.appendChild(fpsNode, fpsValueNode);
    goog.dom.appendChild(fpsNode, goog.dom.createTextNode(' fps'));
    new goog.debug.FpsDisplay().decorate(fpsValueNode);

    /* Phonegap support: If we see debug=<identifier>, load the
     * phonegap script.  You can then debug at
     * http://debug.phonegap.com/client/#<identifier> */
    if (debugValue.length > 0) {
      window.console.log('Enabling phonegap at ' +
                         'http://debug.phonegap.com/client/#' + debugValue);
      var phonegap_script_url = ('http://debug.phonegap.com/target/' +
                                 'target-script-min.js#' + debugValue);
      goog.net.jsloader.load(phonegap_script_url);
    }
  }

  this.pfdSettingsModel = new GCSDjimMolenkamp.PFDSettingsModel();
  this.pfdView = new GCSDjimMolenkamp.PFDView({
    'mavlinkSrc': this.mavlinkAPI,
    'settingsModel': this.pfdSettingsModel,
    'drawingid': 'pfdview',
    'blockel': $('#pfdblock'),
    'statel': $('#pfdstatus')
  });

  this.guideModel = new GCSDjimMolenkamp.GuideModel({ 'mavlinkSrc': this.mavlinkAPI });
  this.guideAltView = new GCSDjimMolenkamp.GuideAltitudeView({
    'model': this.guideModel,
    'input': $('#guidealt-input'),
    'submit': $('#guidealt-submit'),
    'text': $('#guidealt-text')
  });

  this.leafletDroneIcon = new GCSDjimMolenkamp.LeafletDroneIconModel();
  this.leafletProviders = new GCSDjimMolenkamp.LeafletProviders();

  this.vehicle = new GCSDjimMolenkamp.VehicleLeafletPosition({
    'mavlinkSrc': this.mavlinkAPI
  });

  this.panModel = new GCSDjimMolenkamp.LeafletPanModel({
    'vehicle': this.vehicle
  });
  this.panCtrl = new GCSDjimMolenkamp.LeafletPanControlView({
    'model': this.panModel,
    'button': $('#mapoverlay-btn-centermap'),
    'icon': $('#mapoverlay-icon-centermap')
  });
  this.mapView = new GCSDjimMolenkamp.LeafletView({
    'vehicle': this.vehicle,
    'provider': this.leafletProviders,
    'vehicleIcon': this.leafletDroneIcon,
    'guideModel': this.guideModel,
    'panModel': this.panModel
  });

  this.commStatusModel = new GCSDjimMolenkamp.CommStatusModel({
    'mavlinkSrc': this.mavlinkAPI
  });

  this.packetLossModel = new GCSDjimMolenkamp.PacketLossModel({
    'mavlinkSrc': this.mavlinkAPI
  });

  this.commStatusButtonView = new GCSDjimMolenkamp.CommStatusButtonView({
    'commStatusModel': this.commStatusModel,
    'packetLossModel': this.packetLossModel,
    'el': $('#navbar-btn-link')
  });

  this.gpsButtonView = new GCSDjimMolenkamp.GpsButtonView({
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#navbar-btn-gps')
  });
  
  this.altSpeedView = new GCSDjimMolenkamp.AltSpeedView({		// Djim
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#navbar-btn-altspeed')
  });

  this.distanceView = new GCSDjimMolenkamp.DistanceView({		// Djim
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#navbar-btn-distance')
  });

  this.statustextView = new GCSDjimMolenkamp.StatustextView({
    'mavlinkSrc': this.mavlinkAPI
  });

  this.modeStringView = new GCSDjimMolenkamp.ModeStringView({
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#pfd_modestringview')
  });

  this.flightModeModel = new GCSDjimMolenkamp.FlightModeModel({
    'mavlinkSrc': this.mavlinkAPI
  });
  this.flightCommandModel = new GCSDjimMolenkamp.CommandLongModel({
    'mavlinkSrc': this.mavlinkAPI
  });
  this.flightModeButtonView = new GCSDjimMolenkamp.FlightModeButtonView({
    'el': $('#navbar-btn-mode'),
    'modeModel': this.flightModeModel
  });
  
  this.batteryButton = new GCSDjimMolenkamp.BatteryButton({
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#navbar-btn-battery')
  });
  
  /* Radio view controller */
  this.statusButtons = new GCSDjimMolenkamp.RadioButtonPopoverView({
    popovers: [ { btn: this.gpsButtonView,
                  delegate: new GCSDjimMolenkamp.GpsPopoverViewDelegate({
                    'mavlinkSrc': this.mavlinkAPI
                    })
                },
                { btn: this.commStatusButtonView,
                  delegate: new GCSDjimMolenkamp.CommStatusPopoverViewDelegate({
                    'packetLossModel': this.packetLossModel
                    })
                },
                { btn: this.flightModeButtonView,
                  delegate: new GCSDjimMolenkamp.FlightModePopoverViewDelegate({
                    'modeModel': this.flightModeModel,
                    'commandModel': this.flightCommandModel
                    })
                },
				{ btn: this.altSpeedView,								// Djim 
                  delegate: new GCSDjimMolenkamp.AltSpeedPopoverViewDelegate({
                    'mavlinkSrc': this.mavlinkAPI
                    })
                },
				{ btn: this.batteryButton,								// Djim 
                  delegate: new GCSDjimMolenkamp.BatteryPopoverViewDelegate({
                    'mavlinkSrc': this.mavlinkAPI
                    })
                },
              ]
  });


  
/*   this.primaryInfo = new GCSDjimMolenkamp.PrimaryInfo({
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#navbar-btn-primaryinfo')
  }); */


  this.settingsView = new GCSDjimMolenkamp.SettingsView({
    /* Map settings: */
    'map': this.mapView.map,
    'mapView': this.mapView,
    'mapProviderModel': this.leafletProviders,
    'vehicleIconModel': this.leafletDroneIcon,
    'modalToggle': $('#navbar-a-settings'),
    'modal': $('#settings-modal'),
    'mapProviderPicker': $('#settings-mapproviderpicker'),
    'mapZoomSlider': $('#settings-mapzoom'),
    'mapZoomValue': $('#settings-mapzoom-value'),
    'mapPathPicker': $('#settings-mappathpicker'),
    'vehicleIconPicker': $('#settings-vehicleiconpicker'),
    /* PFD settings: */
    'pfdSettingsModel': this.pfdSettingsModel,
    'pfdPositionLeft': $('#settings-pfdpos-left'),
    'pfdPositionRight': $('#settings-pfdpos-right'),
    'pfdPositionUp': $('#settings-pfdpos-up'),
    'pfdPositionDown': $('#settings-pfdpos-down')
  });

  this.router = new GCSDjimMolenkamp.AppRouter({
    'pfdSettingsModel': this.pfdSettingsModel
  });

  Backbone.history.start();

  if ($(window).width() > 767) {
    /* On the desktop, default to overview */
    this.router.navigate('overview', {'trigger': true});
  } else {
    /* On tablets and phones, default to map only */
    this.router.navigate('overview', {'trigger': true});
  }

  // By trying to update at the maximum frame rate, but using a
  // throttle to clamp it to a max 10 Hz update rate, we end up
  // requesting new vehicle data and rendering it at a 10 Hz rate, or
  // slower if the rendering isn't keeping up.
  var MAX_UPDATES_PER_SEC = 10;
  var animationDelay = null;
  var updateThrottle = new goog.async.Throttle(
      function() {
        this.mavlinkAPI.update();
        animationDelay.start();
      },
      1000 / MAX_UPDATES_PER_SEC,
      this);
  animationDelay = new goog.async.AnimationDelay(
      function() {
        updateThrottle.fire();
      });
  animationDelay.start();
};


// Ensures the symbol will be visible after compiler renaming.
goog.exportSymbol('GCSDjimMolenkamp.App', GCSDjimMolenkamp.App);
goog.exportSymbol('GCSDjimMolenkamp.App.prototype.start', GCSDjimMolenkamp.App.prototype.start);
