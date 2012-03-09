  // Custom sorting plugin
  (function($) {
	$.fn.sorted = function(customOptions) {
		var options = {
			reversed: false,
			by: function(a) { return a.text(); }
		};
		$.extend(options, customOptions);
		$data = $(this);
		arr = $data.get();
		arr.sort(function(a, b) {
			var valA = options.by($(a));
			var valB = options.by($(b));
			if (options.reversed) {
				return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;
			} else {
				return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;
			}
		});
		return $(arr);
	};
  })(jQuery);

  // DOMContentLoaded
  $(function() {
//set-up dialog
	$("#portfolio-dialog").dialog({
		bgiframe: true,
		height: 540,
		width: 780,
		modal: true,
		autoOpen: false
	});
//set-up tips
    $.fn.tipsy.defaults = {
        delayIn: 0,
        delayOut: 0.1,
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        opacity: 0.8,
        title: 'title'
    };
	// bind radiobuttons in the form
	var $filterType = $('#filter input[name="type"]');
	var $filterSort = 'name';//$('#filter input[name="sort"]');

	// get the first collection
	var $applications = $('#applications');

	// clone applications to get a second collection
	var $data = $applications.clone();

	// attempt to call Quicksand on every form change
	//$filterType.add($filterSort).change(function(e) {
	$('#filter a').add($filterSort).click(function(e) {
		$('#filter a.active').removeClass('active');
		$(this).addClass('active');
		if ($($filterType+':checked').val() == 'all') {
			var $filteredData = $data.find('li');
		} else {
			var $filteredData = $data.find('li[data-type*=' + $($filterType+":checked").val() + ']');
		}
		var f =$(this).attr('href').replace('#fltr-','');
		if( f == 'all'){
			var $filteredData = $data.find('li');
		}else{
			var $filteredData = $data.find('li[data-type*=' + f + ']');
		}

	  // if sorted by size
		/*if ($('#filter input[name="sort"]:checked').val() == "size") {
			var $sortedData = $filteredData.sorted({
				by: function(v) {
					return parseFloat($(v).find('span[data-type=size]').text());
				}
			});
		} else {*/
		// if sorted by name
			var $sortedData = $filteredData.sorted({
				by: function(v) {
					return $(v).find('strong').text().toLowerCase();
				}
			});
		/*}*/
	  	
		// finally, call quicksand
	  $applications.quicksand($sortedData, {
		duration: 800,
		easing: 'easeInOutQuad'
	  },function() {
	  	setPortfolio();
	  });
	  
	});
	var setPortfolio = function (){
		$("#applications a").tipsy({gravity: $.fn.tipsy.autoNS,fade: true});
		$("#applications a").click(function(){
			adjustPortfolioDialog($(this).attr('href').replace('#',''));
			$("#portfolio-dialog").dialog('open');return false;
		});
	}
	var adjustPortfolioDialog = function(p){
		$('#portfolio-content div[class*=active]').removeClass('active');
		$('#'+p).addClass('active');
	}
	setPortfolio();
	/*
	var r = Raphael("clickfun", 200, 200),dashed = {fill: "none", stroke: "#666", "stroke-dasharray": "- "};
	r.circle(40, 40, 20).attr(dashed);
	r.circle(140, 40, 20).attr(dashed);
	var el = r.circle(40, 40, 20).attr({fill: "#fff", "fill-opacity": 0, stroke: "#f0f", "stroke-width": 2}), elattrs = [{cx: 140, fill: "#f00", "fill-opacity": 1}, {cx: 40, fill: "#fff", "fill-opacity": 0}],now = 0;
	
	el.node.onclick = function () {
		el.animate(elattrs[now++], 1000);
		if (now == 2) {
			now = 0;
		}
	};
	*/
  });