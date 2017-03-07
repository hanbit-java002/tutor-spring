require([
	"common",
], function() {
	var common = require("common");
	
	function loadList() {
		$.ajax({
			url: "/admin/api/category/list",
			success: function(list) {
				var itemHTML = "";
				
				for (var i=0; i<list.length; i++) {
					var item = list[i];
					
					itemHTML += "<tr>";
					itemHTML += "<td>" + (i+1) + "</td>";
					itemHTML += "<td>" + item.category_name + "</td>";
					itemHTML += "<td>" + item.category_id + "</td>";
					itemHTML += "</tr>";
				}
				
				$(".admin-list table>tbody").html(itemHTML);
			},
		})
	}
	
	common.initMgmt(function(section, jqElement) {
		if (section === ".admin-list") {
			loadList();
		}
		else if (section === ".admin-add") {
			$("#add-category_name").val("");
			$("#add-category_name").focus();
		}
		else if (section === ".admin-update") {
			
		}
	});
});