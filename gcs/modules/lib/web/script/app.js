goog.provide('MineGCS.App');

goog.require('MineGCS.AltSpeedView');						// Djim
goog.require('MineGCS.AltSpeedPopoverViewDelegate');		// Djim
goog.require('MineGCS.AppRouter');
goog.require('MineGCS.BatteryButton');						// Djim
goog.require('MineGCS.BatteryPopoverViewDelegate');		    // Djim
goog.require('MineGCS.CommStatusButtonView');
goog.require('MineGCS.CommStatusPopoverViewDelegate');
goog.require('MineGCS.CommStatusModel');
goog.require('MineGCS.CommandLongModel');
goog.require('MineGCS.DistanceView');						// Djim
goog.require('MineGCS.FlightModeButtonView');
goog.require('MineGCS.FlightModePopoverViewDelegate');
goog.require('MineGCS.FlightModeModel');
goog.require('MineGCS.GpsButtonView');
goog.require('MineGCS.GpsPopoverViewDelegate');
goog.require('MineGCS.GuideAltitudeView');
goog.require('MineGCS.GuideModel');
goog.require('MineGCS.LeafletDroneIconModel');
goog.require('MineGCS.LeafletPanControlView');
goog.require('MineGCS.LeafletPanModel');
goog.require('MineGCS.LeafletProviders');
goog.require('MineGCS.LeafletView');
goog.require('MineGCS.MavlinkAPI');
goog.require('MineGCS.ModeStringView');
goog.require('MineGCS.PFD');
goog.require('MineGCS.PFDSettingsModel');
goog.require('MineGCS.PFDView');
goog.require('MineGCS.PacketLossModel');
goog.require('MineGCS.PopoverView');
goog.require('MineGCS.RadioButtonPopoverView');
goog.require('MineGCS.SettingsView');
goog.require('MineGCS.StatustextView');
goog.require('MineGCS.VehicleLeafletPosition');

goog.require('goog.Uri');
goog.require('goog.array');
goog.require('goog.async.AnimationDelay');
goog.require('goog.async.Throttle');
goog.require('goog.debug.Console');
goog.require('goog.debug.FpsDisplay');
goog.require('goog.dom');
goog.require('goog.net.jsloader');



/**
 * MineGCS App object.
 *
 * @constructor
 */
MineGCS.App = function() {
};


/**
 * Initializes and starts the app.
 */
MineGCS.App.prototype.start = function() {
  var c = new goog.debug.Console();
  c.setCapturing(true);

  var uri = new goog.Uri(window.location.href);
  this.mavlinkAPI = new MineGCS.MavlinkAPI({ 'url': '/mavlink/' });
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

  this.pfdSettingsModel = new MineGCS.PFDSettingsModel();
  this.pfdView = new MineGCS.PFDView({
    'mavlinkSrc': this.mavlinkAPI,
    'settingsModel': this.pfdSettingsModel,
    'drawingid': 'pfdview',
    'blockel': $('#pfdblock'),
    'statel': $('#pfdstatus')
  });

  this.guideModel = new MineGCS.GuideModel({ 'mavlinkSrc': this.mavlinkAPI });
  this.guideAltView = new MineGCS.GuideAltitudeView({
    'model': this.guideModel,
    'input': $('#guidealt-input'),
    'submit': $('#guidealt-submit'),
    'text': $('#guidealt-text')
  });

  this.leafletDroneIcon = new MineGCS.LeafletDroneIconModel();
  this.leafletProviders = new MineGCS.LeafletProviders();

  this.vehicle = new MineGCS.VehicleLeafletPosition({
    'mavlinkSrc': this.mavlinkAPI
  });

  this.panModel = new MineGCS.LeafletPanModel({
    'vehicle': this.vehicle
  });
  this.panCtrl = new MineGCS.LeafletPanControlView({
    'model': this.panModel,
    'button': $('#mapoverlay-btn-centermap'),
    'icon': $('#mapoverlay-icon-centermap')
  });
  this.mapView = new MineGCS.LeafletView({
    'vehicle': this.vehicle,
    'provider': this.leafletProviders,
    'vehicleIcon': this.leafletDroneIcon,
    'guideModel': this.guideModel,
    'panModel': this.panModel
  });

  this.commStatusModel = new MineGCS.CommStatusModel({
    'mavlinkSrc': this.mavlinkAPI
  });

  this.packetLossModel = new MineGCS.PacketLossModel({
    'mavlinkSrc': this.mavlinkAPI
  });

  this.commStatusButtonView = new MineGCS.CommStatusButtonView({
    'commStatusModel': this.commStatusModel,
    'packetLossModel': this.packetLossModel,
    'el': $('#navbar-btn-link')
  });

  this.gpsButtonView = new MineGCS.GpsButtonView({
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#navbar-btn-gps')
  });
  
  this.altSpeedView = new MineGCS.AltSpeedView({		// Djim
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#navbar-btn-altspeed')
  });

  this.distanceView = new MineGCS.DistanceView({		// Djim
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#navbar-btn-distance')
  });

  this.statustextView = new MineGCS.StatustextView({
    'mavlinkSrc': this.mavlinkAPI
  });

  this.modeStringView = new MineGCS.ModeStringView({
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#pfd_modestringview')
  });

  this.flightModeModel = new MineGCS.FlightModeModel({
    'mavlinkSrc': this.mavlinkAPI
  });
  this.flightCommandModel = new MineGCS.CommandLongModel({
    'mavlinkSrc': this.mavlinkAPI
  });
  this.flightModeButtonView = new MineGCS.FlightModeButtonView({
    'el': $('#navbar-btn-mode'),
    'modeModel': this.flightModeModel
  });
  
  this.batteryButton = new MineGCS.BatteryButton({
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#navbar-btn-battery')
  });
  
  /* Radio view controller */
  this.statusButtons = new MineGCS.RadioButtonPopoverView({
    popovers: [ { btn: this.gpsButtonView,
                  delegate: new MineGCS.GpsPopoverViewDelegate({
                    'mavlinkSrc': this.mavlinkAPI
                    })
                },
                { btn: this.commStatusButtonView,
                  delegate: new MineGCS.CommStatusPopoverViewDelegate({
                    'packetLossModel': this.packetLossModel
                    })
                },
                { btn: this.flightModeButtonView,
                  delegate: new MineGCS.FlightModePopoverViewDelegate({
                    'modeModel': this.flightModeModel,
                    'commandModel': this.flightCommandModel
                    })
                },
				{ btn: this.altSpeedView,								// Djim 
                  delegate: new MineGCS.AltSpeedPopoverViewDelegate({
                    'mavlinkSrc': this.mavlinkAPI
                    })
                },
				{ btn: this.batteryButton,								// Djim 
                  delegate: new MineGCS.BatteryPopoverViewDelegate({
                    'mavlinkSrc': this.mavlinkAPI
                    })
                },
              ]
  });


  
/*   this.primaryInfo = new MineGCS.PrimaryInfo({
    'mavlinkSrc': this.mavlinkAPI,
    'el': $('#navbar-btn-primaryinfo')
  }); */


  this.settingsView = new MineGCS.SettingsView({
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

  this.router = new MineGCS.AppRouter({
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
goog.exportSymbol('MineGCS.App', MineGCS.App);
goog.exportSymbol('MineGCS.App.prototype.start', MineGCS.App.prototype.start);
