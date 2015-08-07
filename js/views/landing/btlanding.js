
define([
  'jquery',
  'lodash',
  'backbone',
  'events',
  'jqueryDatatable',
  'bootstrap',
  'bootstrapslider',
  'models/dashboardmodel',
  'collections/landingCollection',
  'common',
  'text!templates/landing/landing.html'
], function($, _, Backbone,eventsprop,jqueryDatatable,bootstrap,bootstrapslider,dashboardmodel,landingcollection,common,landingPageTemplate){
  var DashboardPage = Backbone.View.extend({

    el: '.page',
    events: {
      'click .footer-bot' : 'tablererender',
      'click .reqsuittab' : 'reqsuitrender',
      'click .type-icon' : 'showpopup',
      'click .appdetnav' : 'navigate',
      'click #advancedSearchButn' : 'advancedsearchpopup',
      'click #advancedSearchAlertButn' : 'advancedsearchalertpopup',
      'click #advancedSearchBtn' : 'getdata',
      'click #advancedSearchAlertBtn' : 'getalertdata',
      'click #advanceSearchClear' : 'cleardata',
      'keyup #policy-search' : 'searchtable',
      'keyup #policy-alert-search' : 'searchalerttable',
      'click #inforceAlertsStatList a' : 'changestatus',
      'click .checkbox' : 'selectcheck'
    },
    template: _.template(landingPageTemplate),
    initialize: function(options){
      this.tab = options.tab;
      this.model = new dashboardmodel();
      this.collection = new landingcollection();
      this.k = 0;
      this.model.on('change', this.render, this);
      //this.collection.on('change',this.tablerender,this);
      this.model.fetch();

    },
    changestatus: function(e){
      e.preventDefault();
      $(e.currentTarget).parent('li').addClass('active').siblings('li').removeClass('active');
      $('#selectedStatus').text($(e.currentTarget).text());
      this.alertsearch('','','',$(e.currentTarget).text());
    },
    searchalerttable: function(e){
      var polval = $('#policy-alert-search').val();
      this.alertsearch(polval);
    },
    alertsearch : function(polval,lobList,statusList,statusval){
      var that = this;
      this.collection.url = "js/models/json/alertslanding.json";
      this.collection.fetch({
        success:function(){
          var filterType = _.filter(that.collection.models,function(item){
            var name = (item.get('Insured').LastName + ' , ' + item.get('Insured').FirstName).trim();
                return item.get('ContractNo').trim().indexOf(polval) != -1 || name.toLowerCase().indexOf(polval) != -1 ;
            })
          
            if(lobList != undefined && lobList.length > 0){
            filterType =  _.filter(filterType,function(item){
              
              if(lobList.length == 1)
              {
                return item.get('LineBusiness').toLowerCase() == lobList[0].toLowerCase();
              } else if(lobList.length == 2)
              {
                return item.get('LineBusiness').toLowerCase() == lobList[0].toLowerCase() || item.get('LineBusiness').toLowerCase() == lobList[1].toLowerCase();
              } else if(lobList.length == 3)
              {
                return item.get('LineBusiness').toLowerCase() == lobList[0].toLowerCase() || item.get('LineBusiness').toLowerCase() == lobList[1].toLowerCase() || item.get('LineBusiness').toLowerCase() == lobList[2].toLowerCase() || item.get('LineBusiness').toLowerCase() == "null";
              }
            
              
            })
              
          }
          if(statusList != undefined && statusList.length > 0){
            filterType =  _.filter(filterType,function(item){
              
              if(statusList.length == 1)
              {
                return item.get('AlertStatus').toLowerCase() == statusList[0].toLowerCase();
              } else if(statusList.length == 2)
              {
                return item.get('AlertStatus').toLowerCase() == statusList[0].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[1].toLowerCase();
              } else if(statusList.length == 3)
              {
                return item.get('AlertStatus').toLowerCase() == statusList[0].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[1].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[2].toLowerCase();
              } else if(statusList.length == 4)
              {
                return item.get('AlertStatus').toLowerCase() == statusList[0].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[1].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[2].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[3].toLowerCase();
              } else if(statusList.length == 5)
              {
                return item.get('AlertStatus').toLowerCase() == statusList[0].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[1].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[2].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[3].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[4].toLowerCase();
              } else if(statusList.length == 6)
              {
                return item.get('AlertStatus').toLowerCase() == statusList[0].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[1].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[2].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[3].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[4].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[5].toLowerCase();
              } else if(statusList.length == 7)
              {
                return item.get('AlertStatus').toLowerCase() == statusList[0].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[1].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[2].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[3].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[4].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[5].toLowerCase() || item.get('AlertStatus').toLowerCase() == statusList[6].toLowerCase();
              }

              
              
            })
              
          }
          if(statusval != undefined && statusval != ''){
          filterType =  _.filter(filterType,function(item){
                if(statusval.toLowerCase() == "all")
                {
                  return item.get('AlertStatus') == "Saved" ||  item.get('AlertStatus') == "Call" || item.get('AlertStatus') == "Write" || item.get('AlertStatus') == "New" || item.get('AlertStatus') == "Retrieved" || item.get('AlertStatus') == "Unread";
                }else{
                  return item.get('AlertStatus') == statusval;
                }
                
          })
        }
          that.collection.reset(filterType);
      that.searchalerttablerender(that.collection.toJSON());
        }
      })
      
    },
    searchalerttablerender : function(data){
      $(this.el).find('#landingDataTableone').find('table').dataTable({
                                        "bScrollCollapse": true,
                                        "bPaginate": false,
                                        "bDestroy": true,
                                        "bFilter": false,
                                        "aaData": data,
                                        "bAutoWidth": false,
                                        "bInfo": false,
                                        "aoColumns": [{
                                            "mDataProp": function (data, type, row) { 
            var name = '';
            if ("null" != data.Insured.LastName && "null" == data.Insured.FirstName){
              name += data.Insured.LastName;
            } 
            if ("null" != data.Insured.FirstName && "null" == data.Insured.LastName){
              name += data.Insured.FirstName;
            }
            if ("null" != data.Insured.LastName && "null" != data.Insured.FirstName ){
              name += data.Insured.LastName + ' , ' + data.Insured.FirstName;
            }
            return name.trim();},
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        },{
                                           "mDataProp": function (data, type, row) {
                                              return "null" != data.ContractNo ? data.ContractNo : '';
                                            },
                                            "sType": "string"
                                          },
                                          { 
                                            "mDataProp": function (data, type, row) {
                                              return "null" != data.AlertCategory ? data.AlertCategory : '';
                                            },
                                            "sType": "string"
                                          }, 
                                          { 
                                            "mDataProp": function (data, type, row) {
                                              return "null" != data.AlertName ? data.AlertName : '';
                                            },
                                            "sType": "string"
                                          },
                                          { 
                                            "mDataProp": function (data, type, row) {
                                              return "null" != data.CreationDate ? data.CreationDate : '';
                                            },
                                            "sType": "date"
                                          },
                                          { 
                                            "mDataProp": function (data, type, row) {
                                              return "null" != data.AlertStatus ? data.AlertStatus : '';
                                            },
                                            "sType": "string"
                                          },{
                                            "bSortable": false,
                                            "bSearchable": false,
                                            "mDataProp": "case_no",
                                            "fnRender": function(data) {
                                              
                                                return '<span class="type-icon notif-icon navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></span>';
                                            }
                                        }],
                                        "aaSorting": [],
                                        "fnDrawCallback": function() {
                                            var sort = "";
                                           
                                        }
                                    });
          common.adjustTable();
    },
    searchtable : function(e){
      console.log('key event fired');
      var polval = $('#policy-search').val();
      this.search(polval);
      
    },
    cleardata: function(e){
      e.preventDefault();
      $('#contractInsured').val('');
      $('#productText').val('');
      $('#statusSelect').val('');
      this.amountSlider.slider('setValue',0);
      this.daysSlider.slider('setValue',0);
      $("#days-outstanding-checkbox").prop('checked',false);
      this.search($('#contractInsured').val(),$('#productText').val(),this.amountSlider.slider('getValue'));
    },
    search:function(polval,prodval,statusval,amountval,daysrem){
      console.log(this.collection);
      var that =this;
      this.collection.url = "js/models/json/newBusinessListone.json";
      this.collection.fetch({
        success:function(){
          var filterType = _.filter(that.collection.models,function(item){
                return item.get('contract_no').indexOf(polval) != -1 || item.get('insuredname').toLowerCase().indexOf(polval) != -1 ;
            })
          
          if(prodval != undefined){
            filterType =  _.filter(filterType,function(item){
                return item.get('contract_plan_desc').toLowerCase().indexOf(prodval) != -1 ;
            })
            
          }

          if(statusval != undefined && statusval != ''){
            filterType =  _.filter(filterType,function(item){
                return item.get('type').toLowerCase().indexOf(statusval.toLowerCase()) != -1 ;
            })
            
          }

          if(amountval != undefined){
            filterType =  _.filter(filterType,function(item){
                return parseInt(item.get('contract_face_amt').replace(/\,/g, "").slice(1)) > amountval ;
            })
          }

          if(daysrem != undefined){
            filterType =  _.filter(filterType,function(item){
              var receivedDay = (item.get('app_received_date').slice(0, 10)).split("-");
              var statusDay = (item.get('contract_stat_date').slice(0, 10)).split("-");
              var rd = new Date(receivedDay[0], receivedDay[1] - 1, receivedDay[2]);
              var sd = new Date(statusDay[0], statusDay[1] - 1, statusDay[2]);
              var currentDate = new Date();
              var timeDiff = currentDate - rd;
              var ostDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                return ostDays > daysrem ;
          })

            
            
          }
          
      console.log(polval);
      that.collection.reset(filterType);
      that.searchtablerender(that.collection.toJSON());
        }
      })
    },
    getdata : function(e){
      e.preventDefault();
      console.log('click fired');
      var days;
      if ($("#days-outstanding-checkbox").is(":checked")) {
        days = this.daysSlider.slider('getValue');
      }
      this.search($('#contractInsured').val(),$('#productText').val(),$('#statusSelect').val(),this.amountSlider.slider('getValue'),days);
    },
    getalertdata : function(e){
      e.preventDefault();
      var lobList = [],statusList = [];
      $(".lob-filter-check").each(function () {
        if ($(this).is(':checked') && $(this).siblings().text().trim().toLowerCase()!= "all") {
          lobList.push($(this).siblings('label').text().trim());
        }
      });

      $(".status-filter-check").each(function () {
        if ($(this).is(':checked') && $(this).siblings().text().trim().toLowerCase()!= "all") {
          statusList.push($(this).siblings('label').text().trim());
        }
      });

      this.alertsearch($('#adv-policy-search').val(),lobList,statusList);
    },
    lobselect : function(e,x,y){
      if( !$(e.target).is($(e.currentTarget).find(x)) ){
        if($(e.currentTarget).find(x).is(':checked'))
        {
          $(e.currentTarget).find(x).prop('checked',false);
          if(!($(e.currentTarget).hasClass('all_check') )){
            this.k--;
          }
        }
        else{
          $(e.currentTarget).find(x).prop('checked',true);
          if(!($(e.currentTarget).hasClass('all_check') )){
            this.k++;
          }
        }
      }
      else{
        if($(e.currentTarget).find(x).is(':checked')){
          this.k++;
        }
        else{
          this.k--;
        }
      }


       // All checkbox 

      if($(e.currentTarget).hasClass('all_check')){
        
        if($(e.currentTarget).find(x).is(':checked')){
          $(y).find('.checkbox').find(x).prop('checked',true);
          this.k=$(y).find('.checkbox').find(x).length - 1;
        }
        else{
          $(y).find('.checkbox').find(x).prop('checked',false);
          this.k= 0 ;
        }
      }
      else{
        if(this.k == ($(y).find('.checkbox').find(x).length - 1)){
          $(y).find('.all_check').find(x).prop('checked',true);
        }
        else{
          $(y).find('.all_check').find(x).prop('checked',false);
        }
      }
    },
    selectcheck : function(e){
      if($('.lob-filter').find($(e.currentTarget)).length > 0){
        this.lobselect(e,'.lob-filter-check','.lob-filter');
      }else if($('.status-filter').find($(e.currentTarget)).length > 0){
        this.lobselect(e,'.status-filter-check','.status-filter');
      }

      
      
    },
    advancedsearchpopup : function(){
      if(this.amountSlider.slider('getValue') == 0){
        this.amountSlider.siblings('div').find('.tooltip-main').css('margin-left','-20px');  
      }
      if(this.daysSlider.slider('getValue') == 0){
        this.daysSlider.siblings('div').find('.tooltip-main').css('margin-left','-16.5px');  
      }
      
    },
    advancedsearchalertpopup: function(){
      $("#inforceAlertsAdvSrchDropdwn").modal('show');
    },
    searchtablerender : function(data){
      $(this.el).find('#landingDataTableone').find('table').dataTable({
                                        "bScrollCollapse": true,
                                        "bPaginate": false,
                                        "bDestroy": true,
                                        "bFilter": false,
                                        "aaData": data,
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
    },
    reqsuitrender:function(e){
      e.preventDefault();
      var reqsuitclick = $(e.currentTarget).attr('data-reqsuit');
      this.tabone = this.tab + reqsuitclick;
      this.tablerender(this.tabone);
    },
    tablerender:function(queryString){
      //console.log(queryString);
      var landingcollobj = this.collection;
      var that =this;
      var tbl_wrapp = $(that.el).find('#landingDataTableone');
      this.amountSlider = $(that.el).find('#amount-range-Slider');
      this.daysSlider = $(that.el).find('#outstanding-range-Slider');
      tbl_wrapp.html('');
      this.collection.reset();

       if(queryString == "notify"){
        $(this.el).find('#showAllWrapper').removeClass('hide').end().find('#reqSuitTabWrapper').addClass('hide').end().find('#businessSearchWrapper').addClass('hide').end().find('.landing-header-content').text("New Notifications");
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
        $(that.el).find('#showAllWrapper').addClass('hide').end().find('#reqSuitTabWrapper').removeClass('hide').end().find('#suitLink').parent().removeClass('active').end().end().find('#requirementLink').parent().addClass('active').end().end().find('#businessSearchWrapper').addClass('hide').end().find('.landing-header-content').text("Outstanding Items - Awaiting Agent Action");
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
        $(that.el).find('.inforce-alerts-notifications-header').addClass('hide').end().find('.new-notifications-header').removeClass('hide');
        $(that.el).find('#showAllWrapper').addClass('hide').end().find('#reqSuitTabWrapper').removeClass('hide').end().find('#requirementLink').parent().removeClass('active').end().end().find('#suitLink').parent().addClass('active').end().end().find('#businessSearchWrapper').addClass('hide').end().find('.landing-header-content').text("Outstanding Items - Awaiting Agent Action");
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
        $(that.el).find('.inforce-alerts-notifications-header').addClass('hide').end().find('.new-notifications-header').removeClass('hide');
        $(that.el).find('#showAllWrapper').addClass('hide').end().find('#reqSuitTabWrapper').removeClass('hide').end().find('#suitLink').parent().removeClass('active').end().end().find('#requirementLink').parent().addClass('active').end().end().find('#businessSearchWrapper').addClass('hide').end().find('.landing-header-content').text("Outstanding Items - Awaiting Others Action");
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
        $(that.el).find('.inforce-alerts-notifications-header').addClass('hide').end().find('.new-notifications-header').removeClass('hide');
        $(that.el).find('#showAllWrapper').addClass('hide').end().find('#reqSuitTabWrapper').removeClass('hide').end().find('#requirementLink').parent().removeClass('active').end().end().find('#suitLink').parent().addClass('active').end().end().find('#businessSearchWrapper').addClass('hide').end().find('.landing-header-content').text("Outstanding Items - Awaiting Others Action");
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
        $(that.el).find('.inforce-alerts-notifications-header').addClass('hide').end().find('.new-notifications-header').removeClass('hide');
        $(that.el).find('#showAllWrapper').addClass('hide').end().find('#reqSuitTabWrapper').addClass('hide').end().find('#businessSearchWrapper').removeClass('hide').end().find('.landing-header-content').text("New Business List");
        this.amountSlider.slider({
                    step: 20000,
                    min: 0,
                        max: 5000000,
                        tooltip: 'always',
                        value: 0,
                  formatter: function(value) {
                    return '>$ ' + common.addCommas(value);
                  }

                });
        this.daysSlider.slider({
                    step: 1,
                    min: 0,
                        max: 90,
                        tooltip: 'always',
                        value: 0,
                  formatter: function(value) {
                    return '> ' + value;
                  }

                });
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

       else if(queryString == "infalerts"){
        $(that.el).find('.inforce-alerts-notifications-header').removeClass('hide').end().find('.new-notifications-header').addClass('hide').end().find('#reqSuitTabWrapper').addClass('hide');
        //$(that.el).find('#showAllWrapper').addClass('hide').end().find('#reqSuitTabWrapper').addClass('hide').end().find('#businessSearchWrapper').removeClass('hide').end().find('.landing-header-content').text("New Business List");
        
        this.collection.url = "js/models/json/alertslanding.json";
        this.collection.fetch({
        success: function() {
          common.data=landingcollobj.toJSON();
          tbl_wrapp.html('<table id="" class="row-border hover landing-data-content-info alert-list-table"></table>');
          tbl_wrapp.find('table').html(common.alertHeader);
          tbl_wrapp.find('table').dataTable({
                                        "bScrollCollapse": true,
                                        "bPaginate": false,
                                        "bDestroy": true,
                                        "bFilter": false,
                                        "aaData": common.data,
                                        "bAutoWidth": false,
                                        "bInfo": false,
                                        "aoColumns": [{
                                            "mDataProp": function (data, type, row) { 
            var name = '';
            if ("null" != data.Insured.LastName && "null" == data.Insured.FirstName){
              name += data.Insured.LastName;
            } 
            if ("null" != data.Insured.FirstName && "null" == data.Insured.LastName){
              name += data.Insured.FirstName;
            }
            if ("null" != data.Insured.LastName && "null" != data.Insured.FirstName ){
              name += data.Insured.LastName + ' , ' + data.Insured.FirstName;
            }
            return name.trim();},
                                            "sDefaultContent": "",
                                            "sType": "string"
                                        },{
                                           "mDataProp": function (data, type, row) {
                                              return "null" != data.ContractNo ? data.ContractNo : '';
                                            },
                                            "sType": "string"
                                          },
                                          { 
                                            "mDataProp": function (data, type, row) {
                                              return "null" != data.AlertCategory ? data.AlertCategory : '';
                                            },
                                            "sType": "string"
                                          }, 
                                          { 
                                            "mDataProp": function (data, type, row) {
                                              return "null" != data.AlertName ? data.AlertName : '';
                                            },
                                            "sType": "string"
                                          },
                                          { 
                                            "mDataProp": function (data, type, row) {
                                              return "null" != data.CreationDate ? data.CreationDate : '';
                                            },
                                            "sType": "date"
                                          },
                                          { 
                                            "mDataProp": function (data, type, row) {
                                              return "null" != data.AlertStatus ? data.AlertStatus : '';
                                            },
                                            "sType": "string"
                                          },{
                                            "bSortable": false,
                                            "bSearchable": false,
                                            "mDataProp": "case_no",
                                            "fnRender": function(data) {
                                              
                                                return '<span class="type-icon notif-icon navbar-toggle"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></span>';
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
       if(queryString != "infalerts"){
        $(this.el).find('.landing-page-footer').removeClass('hide');
        $(this.el).find('.footer-bot').removeClass('footer-active').children('.count').removeClass('count-active').end().end().find('[data-footer="'+queryString+'"]').addClass('footer-active').children('.count').addClass('count-active');
       }else{
        $(this.el).find('.landing-page-footer').addClass('hide');
       }
       
       
    },
    render: function () {
      $(this.el).html(this.template({obj:this.model.toJSON()}));
      this.footerActive(this.tab);
      if((this.tab == "advisor") || (this.tab == "other")){
        this.tabone = this.tab + 'req';
      }else{
        this.tabone = this.tab;
      }
        
      this.tablerender(this.tabone);
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
      $('body').on('click',function(e){
        console.log($(e.currentTarget));
        if(($(e.target).hasClass('type-icon')) || ($(e.target).hasClass('icon-bar'))){
          common.adjustPopup(e);
          $('.notifications-popover-wrapper').removeClass('hide');
        }else{
          $('.notifications-popover-wrapper').addClass('hide');
        }
      })
      
    },
    navigate:function(e){
      e.preventDefault();
      Backbone.history.navigate('appdetails',true);
    }
    
  });

  return DashboardPage;
});
