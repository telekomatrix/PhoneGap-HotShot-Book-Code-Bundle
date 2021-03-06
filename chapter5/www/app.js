/*jshint asi:true, forin:true, noarg:true, noempty:true, eqeqeq:false, bitwise:true, undef:true, curly:true, browser:true, devel:true, smarttabs:true, maxerr:50 */
/*****************************************************************************
 *
 * PhoneGap HotShot
 * Chapter 5 - Talking to our app
 * Application Project: VoiceRec
 *
 *****************************************************************************/

var APP = APP ||
{
};
// set up our namespace

//
// WAIT FOR DEVICE READY BEFORE STARTING OUR APPLICATION
//
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
  APP.start();
}

APP.online = function()
{
  document.removeEventListener("online", APP.online);
  APP.start();
}

APP.offline = function()
{
  alert("A network connection is required to use this app.");
  return;
}
/**
 *
 * Starts up the application. We'll create our initial translation matrix,
 * initialize our models, views, and controllers, and go from there.
 *
 */
APP.start = function()
{
  // for wp7; alert doesn't work: see https://groups.google.com/forum/?fromgroups#!topic/phonegap/4wU-kKr0iQs
  if (device.platform == "WinCE")
  {
    window.alert = navigator.notification.alert;
  }
  // check our network connection
  if (navigator.network.connection.type == Connection.NONE)
  {
    alert("A network connection is required to use this app.");
    document.addEventListener("online", APP.online, false);
    return;
  }
  document.addEventListener("offline", APP.online, false);

  // load some useful libraries
  PKUTIL.include(["./framework/ui-gestures.js", "./framework/ui-msg.js", "./framework/ui-core.js", "./framework/device.js", "./framework/localization.js"], function()
  {
    APP.initLocalization();
  });
}
APP.initLocalization = function()
{

  // initialize the globalization libraries
  PKLOC.initializeGlobalization(function()
  {
    PKLOC.loadLocales(["en-US", "en-AU", "en-GB", "es-ES", "es-MX", "es-US", "es"], function()
    {
      APP.init();
    });
  });
}
APP.init = function()
{

  // fake our locale:
  //PKLOC.currentUserLocale = "es-ES";

  // set up our translation matrix

  // english
  PKLOC.addTranslation("en", "APP_TITLE", "VoiceRec");
  PKLOC.addTranslation("en", "RECORD", "REC");
  PKLOC.addTranslation("en", "BACK", "Back");
  PKLOC.addTranslation("en", "RENAME", "Rename");
  PKLOC.addTranslation("en", "DELETE", "Delete");
  PKLOC.addTranslation("en", "COPY", "Copy");
  PKLOC.addTranslation("en", "NO|YES", "No|Yes");

  APP.globalFileExtension = ".wav|.mp3|.3gp";

  // initialize our application
  PKUI.CORE.initializeApplication();

  // load our socialView
  PKUTIL.loadHTML("./views/documentsView.html",
  {
    id : "documentsView",
    className : "container",
    attachTo : $ge("rootContainer"),
    aSync : true
  }, function(success)
  {
    if (success)
    {
      documentsView.initializeView();
      PKUI.CORE.showView(documentsView);
    }
  });

}

