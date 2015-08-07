define([
  'lodash',
  'backbone'
], function(_, Backbone) {
  var projectsModel = Backbone.Model.extend({
    defaults: {
      
    },
    url : 'js/models/json/appdetailone.json',
    initialize: function(){
      
    }
    
  });
  return projectsModel;

});