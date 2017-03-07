define([
	"bootstrap",
], function() {
	$(".admin-logo").on("click", function() {
		location.href = "/admin/";
	});
	
	$(".admin-menu>ul>li").on("click", function() {
		var menu = $(this).attr("menu");
		
		location.href = "/admin/" + menu;
	});
	
	if (_ctx.menuId && _ctx.menuId !== "") {
		$(".admin-menu>ul>li[menu='" + _ctx.menuId + "']")
			.addClass("active");
	}
	
	function showSection(section) {
		$("section").hide();
		$(section).show();
	}
	
	$(".btn-admin-add").on("click", function() {
		showSection(".admin-add");
	});
	
	$(".btn-admin-cancel").on("click", function() {
		showSection(".admin-list");
	});
	
	$(".admin-list table>tbody>tr").on("click", function() {
		showSection(".admin-update");
	});
});