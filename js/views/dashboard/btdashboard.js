define([
  'jquery',
  'lodash',
  'backbone',
  'models/dashboardmodel',
  'text!templates/dashboard/btdashboard.html'
], function($, _, Backbone,dashboardmodel,dashboardPageTemplate){
  var DashboardPage = Backbone.View.extend({

    el: '.page',
    events:{
      'click .dashboarditem' : 'navigate',
    },
    template: _.template(dashboardPageTemplate),
    initialize: function(options){
      this.model = new dashboardmodel();
      this.model.on('change', this.render, this);
      this.model.fetch();
      
    },
    render: function () {
      $(this.el).html(this.template({obj:this.model.toJSON()}));
    },
    navigate:function(e){
      click = $(e.currentTarget).attr('data-item');
      Backbone.history.navigate('landing?'+click, true);
    }
  });

  return DashboardPage;
});
