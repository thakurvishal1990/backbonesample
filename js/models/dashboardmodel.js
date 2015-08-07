define([
  'lodash',
  'backbone'
], function(_, Backbone) {
  var projectsModel = Backbone.Model.extend({
    defaults: {
      advisorCount: '',
      otherCount: '',
      notifyCount: '',
      newBusinessCount : '',
      alertCount: '',
      click : ''
    },
    url : 'js/models/json/dashboard.json',
    initialize: function(){
      
    }
    
  });
  return projectsModel;

});