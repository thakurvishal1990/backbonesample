define([],function(){

	var obj = {
	inst : '',
	click : '',
	data : '',
	dashboardCount : {
		notifyCount : 0,
		advisorCount : 0,
		otherCount: 0,
		newbusinessCount : 0,
		alertCount: 0,	
	},
	notifiers : {},
	subscribe : function(eventName,Handler){
		obj.notifiers[eventName] = obj.notifiers[eventName] || [];
		obj.notifiers[eventName].push(Handler);
		obj.notifiers[eventName][0]();
	},
	publish : function(eventName,data){
		handlers = obj.notifiers[eventName] || [];
		if(handlers.length > 0){
			handlers.each(function(handler){
			handler(data);
		})
		}
		
	},
	dbrdclick : '',
	dashboardurl : 'js/models/json/dashboard.json',
	datatablekey : 0,
	notificationHeader : '<thead class="landing-data-head-content"><tr class="notificationHeader"><th id="insured-header" class="string-sorting" > Insured / Annuitant </th><th id="policy-header" class="number-sorting"> Policy / Contract# </th><th id="product-header" class="string-sorting"> Product </th><th id="amount-header" class="number-sorting amount-align"> Amount($) </th><th id="last-viewed" class="date-and-time-sorting"> Received Date </th><th id="type-header" class="string-sorting"> Type </th><th class="no-right-border">Action</th></tr></thead>',
	businessHeader : '<thead class="landing-data-head-content"><tr class="businessListHeader"><th id ="insured-header" class="string-sorting">Insured / Annuitant</th><th id="policy-header" class="number-sorting">Policy / Contract#</th><th id="product-header" class="string-sorting">Product</th><th id="amount-header" class="number-sorting amount-align">Amount($)</th><th id="app-received" class="date-sorting">App Received Date</th><th id="app-status-change" class="date-sorting">App Status Change Date</th><th id="app-status" class="string-sorting">Application Status</th><th class="no-right-border">Action</th></tr></thead>',
	reqHeader : '<thead class="landing-data-head-content"><tr class="reqHeader"><th id ="insured-header" class="string-sorting sorting" rowspan="1" colspan="1">Insured / Annuitant</th><th id="policy-header" class="number-sorting sorting" rowspan="1" colspan="1">Policy / Contract#</th><th id="amount-header" class="number-sorting amount-align sorting-desc" rowspan="1" colspan="1">Amount($)</th><th id="days-outstanding" class="number-sorting sorting_desc" rowspan="1" colspan="1">Days Outstanding</th><th id="app-requirement" class="string-sorting sorting" rowspan="1" colspan="1">Requirement</th><th id="docStatus" class="string-sorting sorting" rowspan="1" colspan="1">Doc Upload Status</th><th class="no-right-border sorting_disabled" rowspan="1" colspan="1">Action</th></tr></thead>',
	reqothersHeader : '<thead class="landing-data-head-content"><tr class="reqothersHeader"><th id ="insured-header" class="string-sorting sorting" rowspan="1" colspan="1">Insured / Annuitant</th><th id="policy-header" class="number-sorting sorting" rowspan="1" colspan="1">Policy / Contract#</th><th id="amount-header" class="number-sorting amount-align sorting-desc" rowspan="1" colspan="1">Amount($)</th><th id="days-outstanding" class="number-sorting sorting_desc" rowspan="1" colspan="1">Days Outstanding</th><th id="app-requirement" class="string-sorting sorting " rowspan="1" colspan="1">Requirement</th><th class="no-right-border sorting_disabled" rowspan="1" colspan="1">Action</th></tr></thead>',
	srsHeader : '<thead class="landing-data-head-content"><tr class="suitrevHeader"><th id="insured-header" class="string-sorting sorting" rowspan="1" colspan="1"> Insured / Annuitant </th>  <th id="policy-header" class="number-sorting sorting" rowspan="1" colspan="1"> Policy / Contract# </th><th id="product-header" class="string-sorting sorting" rowspan="1" colspan="1"> Product </th><th id="amount-header" class="number-sorting amount-align sorting_desc" rowspan="1" colspan="1"> Expiry Date </th><th id="last-viewed" class="date-and-time-sorting sorting" rowspan="1" colspan="1"> Days Remaining </th><th id="type-header" class="string-sorting sorting" rowspan="1" colspan="1"> Suitability Review Status </th><th class="no-right-border sorting_disabled" rowspan="1" colspan="1">Action</th></tr></thead>',
	alertHeader : '<thead class="landing-data-head-content"><tr class="alertListHeader"><th id ="insured-header" class="string-sorting sorting"><span class="header-insurance-label">Insured / Annuitant</span></th><th id ="policy-header" class="number-sorting sorting"><span class="header-policy-label">Policy / Contract#</span></th><th id ="category-header" class="string-sorting sorting">Category</th><th id="amount-header" class="number-sorting amount-align sorting">Alert Type</th><th id="app-received" class="date-sorting sorting_desc">Alert Date</th><th id="app-status-alert-change" class="sdate-sorting sorting">Status</th><th class="no-right-border sorting_disabled">Action</th></tr></thead>',
	getData : function(ajurl,ajtype,successHandler,queryString){
		$.ajax({
			url : ajurl,
			type : ajtype,
			success : function(data){
				successHandler(data,queryString);
			}
		})
	},
	adjustTable : function(){
		var refrshht = $(".new-notifications-header").outerHeight();
		var tblhdht = $(".landing-data-content-info thead tr").outerHeight();
		var reqsuitht = $(".req-suitrev-menu").outerHeight();
		var tot = $(window).outerHeight(),ht;
		var tblftht = $(".landing-page-footer").outerHeight();
	    //if (($('.footer-req-agent').hasClass('footer-active')) || ($('.footer-service-center').hasClass('footer-active'))) {
    	ht = tot - (tblhdht+refrshht+reqsuitht+tblftht+14);
	    /*}
	    else{
		ht = tot - (tblhdht+refrshht+topht+bottomht+reqsuitht+tblftht);
	    }*/
	    $('.landing-data-content-info tbody').css('height',ht);
	},
	adjustPopup : function(event){
		var x = $(event.target).offset();
        var tt = $(window).outerHeight();
        var ftht = $('.landing-footer').outerHeight();
        $('.landing-container').before($(".notifications-popover-wrapper").clone().attr('id','maybe_clone').css({ 'position': 'absolute', 'left': '-1000px' }));
        var ppht = $('#maybe_clone').removeClass("hide").show().outerHeight();
        if(x.top >= (tt-(ftht+ppht+20))){
            $('.notifications-popover-wrapper').css('top', (x.top - (ppht-15) ) + 'px');
        }
        else{
            $('.notifications-popover-wrapper').css('top', (x.top) + 'px');
        }
        $('#maybe_clone').remove();
        
       

	},
	addCommas : function(nStr){
								    nStr += '';
								    x = nStr.split('.');
								    x1 = x[0];
								    x2 = x.length > 1 ? '.' + x[1] : '';
								    var rgx = /(\d+)(\d{3})/;
								    while (rgx.test(x1)) {
								        x1 = x1.replace(rgx, '$1' + ',' + '$2');
								    }
								    return x1 + x2;
								}
	}
	
	return obj;
})
