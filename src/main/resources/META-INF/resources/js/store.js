require([
	"common",
], function() {
	var common = require("common");
	
	var handler = function(section, jqElement) {
		if (section === ".admin-add") {
			$(".btn-admin-file").text("파일 선택");
			
			$.ajax({
				url: "/admin/api/category/list",
				success: function(list) {
					var itemsHTML = "";
					
					for (var i=0; i<list.length; i++) {
						var item = list[i];
						
						itemsHTML += "<li><a href='#'>";
						itemsHTML += item.category_name;
						itemsHTML += "</a></li>";
					}
					
					$("#add-category").html(itemsHTML);
				},
			});
			
			$.ajax({
				url: "/admin/api/location/list",
				success: function(list) {
					var itemsHTML = "";
					
					for (var i=0; i<list.length; i++) {
						var item = list[i];
						
						itemsHTML += "<li><a href='#'>";
						itemsHTML += item.location_name;
						itemsHTML += "</a></li>";
					}
					
					$("#add-location").html(itemsHTML);
				},
			});
		}
	};
	
	common.initMgmt(handler);
});