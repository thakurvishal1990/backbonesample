// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
  paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
    lodash: 'libs/lodash/lodash', // alternative to underscore
    pubsub: 'libs/pubsub/pubsub', // Publish Subscribe plugin
    backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
    //sinon: 'libs/sinon/sinon.js',
    jqueryDatatable: 'libs/jquerydatatable/jquery.dataTables',
    bootstrap : 'libs/bootstrap/bootstrap.min',
    bootstrapslider : 'libs/bootstrap/bootstrap-slider/bootstrap-slider',

    common : 'common',

    // Require.js plugins
    text: 'libs/require/text',

    // Just a short cut so we can put our html outside the js dir
    // When you have HTML/CSS designers this aids in keeping them out of the js directory
    templates: '../templates'
  }

});

// Let's kick off the application

require([
  'views/app',
  'router',
  'vm'
], function(AppView, Router, Vm){
  var appView = Vm.create({}, 'AppView', AppView);
  appView.render();
  Router.initialize({appView: appView});  // The router now has a copy of all main appview
});