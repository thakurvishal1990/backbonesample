define([
  'jquery',
  'lodash',
  'backbone',
  'models/landingmodel'
], function($, _, Backbone, projectsModel){
  var projectsCollection = Backbone.Collection.extend({
    model: projectsModel,
    url : 'js/models/json/notificationList.json',
    initialize: function(){

    }

  });

  return projectsCollection;
});
