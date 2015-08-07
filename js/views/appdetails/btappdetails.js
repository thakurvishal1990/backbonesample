
define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'jqueryDatatable',
  'bootstrap',
  'models/appdetailmodel',
  'common',
  'text!templates/appdetails/appdetails.html'
], function($, _, Backbone,eventsprop,jqueryDatatable,bootstrap,appdetailmodel,common,appDetailPageTemplate){
  var DashboardPage = Backbone.View.extend({

    el: '.page',
    events: {
     
      'click .appdetailtab' : 'appdetailtabrender',
      'click .type-icon' : 'showpopup'
    },
    template: _.template(appDetailPageTemplate),
    initialize: function(){
      this.model = new appdetailmodel();
      this.model.on('change', this.render, this);
      this.model.fetch();

    },
    appdetailtabrender:function(e){
      e.preventDefault();
    },
    tablerender:function(queryString){
      //console.log(queryString);
      var landingcollobj = this.collection;
      var that =this;
      var tbl_wrapp = $(that.el).find('#landingDataTableone');
      tbl_wrapp.html('');
      this.collection.reset();

       if(queryString == "notify"){
        $(this.el).find('#showAllWrapper').removeClass('hide').end().find('#reqSuitTabWrapper').addClass('hide');
        this.collection.url = "js/models/json/notificationListone.json";
        this.collection.fetch({
        success: function() {
          common.data=landingcollobj.toJSON();
          tbl_wrapp.html('<table id="" class="row-border hover landing-data-content-info notifications-table"></table>');
          tbl_wrapp.find('table').html(common.notificationHeader);
          tbl_wrapp.find('table').dataTable({

                                        "bScrollCollapse": true,
                                        "bPaginate": false,
                                        "bDestroy": true,
                                        "bFilter": false,
                                        "aaData": common.data,
                                        "bAutoWidth": false,
                                        "bInfo": false,
                                        "aoColumns": [{
                                            "mDataProp": "insuredname",
                                            "sDefaultContent": "", 
                                            "sType": "string"
                                        }, {
                                            "mDataProp": "contract_no",
                                            "sDefaultContent": "", 
                                            "sType": "string"
                                        }, {
                                           "mDataProp": "contract_plan_desc",
                                            "sDefaultContent": ""
                                            }, {
                                            "mDataProp": "contract_face_amt",
                                            "sType": "currency",
                                             "sDefaultContent": ""
                                          }, {
                                            "mDataProp": "contract_stat_date",
                                            "sType": 'date'
                                        }, {
                                            "mDataProp": "notification_name",
                                            "sDefaultContent": "", 
                                            "sType": "string"
                                        }, {
                                            "bSortable": false,
                                            "bSearchable": false,
                                            "mDataProp": "case_no",
                                            "fnRender" : function(){
                                              return  '<span data-descKey ="" class="type-icon notif-icon navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></span>' ;
                                            }
                                        }],
                                        "aaSorting": [],

                                        "fnDrawCallback": function() {
                                          
                                          
                                            
                                        }
                                    });
          common.adjustTable();
        }
      });
       }
      
       else if(queryString == "advisorreq"){
        $(that.el).find('#showAllWrapper').addClass('hide').end().find('#reqSuitTabWrapper').removeClass('hide').end().find('#suitLink').parent().removeClass('active').end().end().find('#requirementLink').parent().addClass('active');
        this.collection.url = "js/models/json/osadvisorReqListone.json";
        this.collection.fetch({
        success: function() {
          common.data=landingcollobj.toJSON();
          tbl_wrapp.html('<table id="" class="row-border hover landing-data-content-info os_items_reqtable"></table>');
          tbl_wrapp.find('table').html(common.reqHeader);
          tbl_wrapp.find('table').dataTable({
                                        "bScrollCollapse": true,
                                        "bPaginate": false,
                                        "bDestroy": true,
                                        "bFilter": false,
                                        "aaData": common.data,
                                        "bAutoWidth": false,
                                        "bInfo": false,
                                        "aoColumns": [{
                                            "mDataProp": "insuredname",
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "mDataProp": "contract",
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "mDataProp": "amount",
                                            "sDefaultContent": "",
                                            "sType": "currency"
                                        }, {
                                            "mDataProp": "daysoutstanding",
                                            "sType": "numeric"
                                        },{
                                            "mDataProp": "requirement",
                                            "sDefaultContent": "", 
                                            "sType": "string"
                                        },{
                      "mDataProp": "docstatus",
                                            "sDefaultContent": "",
                                            "sType": "req"
                    }, {
                                            "bSortable": false,
                                            "bSearchable": false,
                                            "mDataProp": "case",
                                            "fnRender": function(data) {
                                              return  '<span data-descKey ="" class="type-icon notif-icon navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></span>' ;
                       
                                            }
                                        }],
                                        "aaSorting": [],
                                        "fnDrawCallback": function() {
                                            
                                        }
                                    });
          common.adjustTable();
        }
      })
       }

       else if(queryString == "advisorsuit"){
        $(that.el).find('#showAllWrapper').addClass('hide').end().find('#reqSuitTabWrapper').removeClass('hide').end().find('#requirementLink').parent().removeClass('active').end().end().find('#suitLink').parent().addClass('active');
        this.collection.url = "js/models/json/osadvisorSuitListone.json";
        this.collection.fetch({
        success: function() {
          common.data=landingcollobj.toJSON();
          tbl_wrapp.html('<table id="" class="row-border hover landing-data-content-info os_items_suitrevtable"></table>');
          tbl_wrapp.find('table').html(common.srsHeader);
          tbl_wrapp.find('table').dataTable({
                                        "bScrollCollapse": true,
                                        "bPaginate": false,
                                        "bDestroy": true,
                                        "bFilter": false,
                                        "aaData": common.data,
                                        "bAutoWidth": false,
                                        "bInfo": false,
                                        "oLanguage": {
                      "sEmptyTable": "No Outstanding Suitability items for this Agent"
                    },
                                        "aoColumns": [{
                                            "mDataProp": "insuredname",
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "mDataProp": "contract",
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "mDataProp": function ( data, type, val ){
                                              var descString = data.notificationDesc;
                                              if (descString && descString.ProductType) {
                                                return descString.ProductType;
                                              } else if ('null' != data.product) {
                                                return data.product;
                                              }
                                            } ,
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "mDataProp": "expirydate",
                                            "sDefaultContent": "",
                                            "sType": 'date'
                                        },  {
                                          "mDataProp": "daysremaining",
                                          "sDefaultContent": "", 
                                          "sType": 'numeric',
                                           "fnRender": function(data) {
                                            var daysFututre = data.aData['daysRemainfuture'];
                                            var daysRemain = data.aData['daysremaining'];
                                            var stringDate = data.aData['expirydate'];
                                            var stringVal = '';
                                            var sysDate = new Date();
                                            var expiryDate = new Date(Date.parse(stringDate));
                                            expiryDate.setHours(0, 0, 0, 0);
                                              sysDate.setHours(0, 0, 0, 0);
                                              
                                              if (expiryDate){
                                                if (expiryDate.valueOf() > sysDate.valueOf()) {
                                                  stringVal = daysFututre;
                                                } else if (expiryDate.valueOf() < sysDate.valueOf()) {
                                                  stringVal = '0';
                                                } else if (expiryDate.valueOf() == sysDate.valueOf()) {
                                                  stringVal =daysRemain;
                                                }
                                              } 
                                            return stringVal;
                                            }
                                        },{
                                            "mDataProp": "suitabilitystatus",
                                            "sDefaultContent": "", 
                                            "sType": "string"
                                        },{
                                            "bSortable": false,
                                            "bSearchable": false,
                                            "mDataProp": null,
                                             "fnRender": function(data) {
                                              //Suitability List
                                              return  '<span data-descKey ="" class="type-icon notif-icon navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></span>' ;
                                            }
                                        }],
                                        "aaSorting": [],
                                        "fnDrawCallback": function() {
                                            
                                        }
                                    });
        common.adjustTable();
        }
      })
       }


       else if(queryString == "otherreq"){
        $(that.el).find('#showAllWrapper').addClass('hide').end().find('#reqSuitTabWrapper').removeClass('hide').end().find('#suitLink').parent().removeClass('active').end().end().find('#requirementLink').parent().addClass('active');
        this.collection.url = "js/models/json/osothersReqListone.json";
        this.collection.fetch({
        success: function() {
          common.data=landingcollobj.toJSON();
          tbl_wrapp.html('<table id="" class="row-border hover landing-data-content-info os_items_reqotherstable"></table>');
          tbl_wrapp.find('table').html(common.reqothersHeader);
          tbl_wrapp.find('table').dataTable({

                                        "bScrollCollapse": true,
                                        "bPaginate": false,
                                        "bDestroy": true,
                                        "bFilter": false,
                                        "aaData": common.data,
                                        "bAutoWidth": false,
                                        "bInfo": false,
                                        "aoColumns": [{
                                            "mDataProp": "insuredname",
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "mDataProp": "contract",
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "mDataProp": "amount",
                                            "sDefaultContent": "",
                                            "sType": "currency"
                                        }, {
                                            "mDataProp": "daysoutstanding",
                                            "sDefaultContent": "",
                                            "sType": "numeric"
                                        }, {
                                            "mDataProp": "requirement",
                                            "sDefaultContent": "", 
                                            "sType": "string"
                                        },{
                                            "bSortable": false,
                                            "bSearchable": false,
                                            "mDataProp": "case_no",
                                            "fnRender": function(data) {
                                             
                                                return '<span data-descKey = "'+common.datatablekey+'" id="' + data.aData['contract'] + ',' + data.aData['case'] + ',' + data.aData['req_freeform_text'] + ',' + data.aData['requirement'] +'"'+'cm="'+data.aData['cm_email']+'|'+data.aData['cm_name']+'|'+data.aData['cm_phone']+'"'+'uw="'+data.aData['uw_email']+'|'+data.aData['uw_name']+'|'+data.aData['uw_phone']+'"'+ ' class="type-icon service-icon navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></span>';
                                            }
                                        }],
                                        "aaSorting": [],

                                        "fnDrawCallback": function() {
                                           
                                        }
                                    });
          common.adjustTable();
        }
      })
       }

       else if(queryString == "othersuit"){
        $(that.el).find('#showAllWrapper').addClass('hide').end().find('#reqSuitTabWrapper').removeClass('hide').end().find('#requirementLink').parent().removeClass('active').end().end().find('#suitLink').parent().addClass('active');
        this.collection.url = "js/models/json/osothersSuitListone.json";
        this.collection.fetch({
        success: function() {
          common.data=landingcollobj.toJSON();
          tbl_wrapp.html('<table id="" class="row-border hover landing-data-content-info os_items_suitrevtable"></table>');
          tbl_wrapp.find('table').html(common.srsHeader);
          tbl_wrapp.find('table').dataTable({
                                        "bScrollCollapse": true,
                                        "bPaginate": false,
                                        "bDestroy": true,
                                        "bFilter": false,
                                        "aaData": common.data,
                                        "bAutoWidth": false,
                                        "bInfo": false,
                                        "oLanguage": {
                      "sEmptyTable": "No Outstanding Suitability items for this Agent"
                    },
                                        "aoColumns": [{
                                            "mDataProp": "insuredname",
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "mDataProp": "contract",
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "mDataProp": function ( data, type, val ){
                                              var descString = data.notificationDesc;
                                              if (descString && descString.ProductType) {
                                                return descString.ProductType;
                                              } else if ('null' != data.product) {
                                                return data.product;
                                              }
                                            } ,
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "mDataProp": "expirydate",
                                            "sDefaultContent": "",
                                            "sType": 'date'
                                        },  {
                                          "mDataProp": "daysremaining",
                                          "sDefaultContent": "", 
                                          "sType": 'numeric',
                                           "fnRender": function(data) {
                                            var daysFututre = data.aData['daysRemainfuture'];
                                            var daysRemain = data.aData['daysremaining'];
                                            var stringDate = data.aData['expirydate'];
                                            var stringVal = '';
                                            var sysDate = new Date();
                                            var expiryDate = new Date(Date.parse(stringDate));
                                            expiryDate.setHours(0, 0, 0, 0);
                                              sysDate.setHours(0, 0, 0, 0);
                                              
                                              if (expiryDate){
                                                if (expiryDate.valueOf() > sysDate.valueOf()) {
                                                  stringVal = daysFututre;
                                                } else if (expiryDate.valueOf() < sysDate.valueOf()) {
                                                  stringVal = '0';
                                                } else if (expiryDate.valueOf() == sysDate.valueOf()) {
                                                  stringVal =daysRemain;
                                                }
                                              } 
                                            return stringVal;
                                            }
                                        },{
                                            "mDataProp": "suitabilitystatus",
                                            "sDefaultContent": "", 
                                            "sType": "string"
                                        },{
                                            "bSortable": false,
                                            "bSearchable": false,
                                            "mDataProp": null,
                                             "fnRender": function(data) {
                                              //Suitability List
                                              return  '<span data-descKey ="" class="type-icon notif-icon navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></span>' ;
                                            }
                                        }],
                                        "aaSorting": [],
                                        "fnDrawCallback": function() {
                                            
                                        }
                                    });
        common.adjustTable();
        }
      })
       }
       
       else if(queryString == "newbusiness"){
        $(that.el).find('#showAllWrapper').addClass('hide').end().find('#reqSuitTabWrapper').addClass('hide');
        this.collection.url = "js/models/json/newBusinessListone.json";
        this.collection.fetch({
        success: function() {
          common.data=landingcollobj.toJSON();
          tbl_wrapp.html('<table id="" class="row-border hover landing-data-content-info business-list-table"></table>');
          tbl_wrapp.find('table').html(common.businessHeader);
          tbl_wrapp.find('table').dataTable({
                                        "bScrollCollapse": true,
                                        "bPaginate": false,
                                        "bDestroy": true,
                                        "bFilter": false,
                                        "aaData": common.data,
                                        "bAutoWidth": false,
                                        "bInfo": false,
                                        "aoColumns": [{
                                            "mDataProp": "insuredname",
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "mDataProp": "contract_no",
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                           "mDataProp": "contract_plan_desc",
                                            "sDefaultContent": "",
                                            "sType": "string",
                                            "fnRender": function(data) {
                                              if (null == data.aData['contract_plan_desc'] || 'null' == data.aData['contract_plan_desc']) {
                                                return '';
                                              } else {
                                                return data.aData['contract_plan_desc'];
                                              }
                                            }
                                            }, {
                                            "mDataProp": "contract_face_amt",
                                            "sDefaultContent": "",
                                            "sType": "currency"
                                        }, {
                                            "mDataProp": "app_received_date",
                                            "sType": "date"
                                        }, {
                                            "mDataProp": "contract_stat_date",
                                            "sDefaultContent": "",
                                            "sType": "date"
                                            
                                        }, {
                                            "mDataProp": "type",
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        }, {
                                            "bSortable": false,
                                            "bSearchable": false,
                                            "mDataProp": "case_no",
                                            "fnRender": function(data) {
                                              
                                                return '<span data-descKey = "'+common.datatablekey+'" data-source="'+ data.aData['source'] +'" id="' + data.aData['contract_no'] + ',' + data.aData['case_no'] + ',' + data.aData['notification_name'] + '"'+'cm="'+data.aData['cm_email']+'|'+data.aData['cm_name']+'|'+data.aData['cm_phone']+'"'+'uw="'+data.aData['uw_email']+'|'+data.aData['uw_name']+'|'+data.aData['uw_phone']+'"'+'notif_id="'+data.aData['notification_id']+'"'+' class="type-icon notif-icon navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></span>';
                                            }
                                        }],
                                        "aaSorting": [],
                                        "fnDrawCallback": function() {
                                            var sort = "";
                                           
                                        }
                                    });
          common.adjustTable();
        }
      })
       }  
    },
    footerActive : function(queryString){
       $(this.el).find('.footer-bot').removeClass('footer-active').children('.count').removeClass('count-active').end().end().find('[data-footer="'+queryString+'"]').addClass('footer-active').children('.count').addClass('count-active');
       
    },
    render: function () {
      $(this.el).html(this.template({obj:this.model.toJSON()}));
      
    },
   
    
    tablererender : function(e){

      this.tab = $(e.currentTarget).attr('data-footer');
      this.footerActive(this.tab);
      if((this.tab == "advisor") || (this.tab == "other")){
        this.tabone = this.tab + 'req';
      }else{
        this.tabone = this.tab;
      }
      this.tablerender(this.tabone);
    },

    showpopup:function(e){
     /* $('body').on('click',function(e){
        console.log($(e.currentTarget));
        if(($(e.target).hasClass('type-icon')) || ($(e.target).hasClass('icon-bar'))){
          common.adjustPopup(e);
          $('.notifications-popover-wrapper').removeClass('hide');
        }else{
          $('.notifications-popover-wrapper').addClass('hide');
        }
      })*/
      
    }
    
  });

  return DashboardPage;
});
