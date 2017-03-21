require([
	"common",
], function() {
	var common = require("common");
	
	var currentStore = {};
	var rowsPerPage = 5;
	var pagesPerPaging = 5;
	var currentPage = 1;
	
	function getCode(codeType, sectionType) {
		$.ajax({
			url: "/admin/api/" + codeType + "/list",
			success: function(list) {
				var itemsHTML = "";
				
				for (var i=0; i<list.length; i++) {
					var item = list[i];
					
					itemsHTML += "<li><a href='#' item-id='";
					itemsHTML += item[codeType + "_id"] + "'>";
					itemsHTML += item[codeType + "_name"];
					itemsHTML += "</a></li>";
				}
				
				$("#" + sectionType + "-" + codeType).html(itemsHTML);
				
				$("#" + sectionType + "-" + codeType + " a").on("click", function(event) {
					event.preventDefault();
					
					var codeName = $(this).text();
					$("#btn-txt-" + sectionType + "-" + codeType).text(codeName);
					
					var codeId = $(this).attr("item-id");
					currentStore[codeType + "Id"] = codeId;
				});
			},
		});
	}
	
	var handler = function(section, jqElement) {
		if (section === ".admin-list") {
			loadList(currentPage);
		}
		else if (section === ".admin-add") {
			$("#add-store_name").val("");
			$("#add-branch_name").val("");
			$("#add-store_img").val("");
			$(".btn-admin-file").text("파일 선택");
			currentStore = {};
			$("#add-store_addr").val("");
			$("#add-store_addr").parent("div").find("img").remove();
			$("#btn-txt-add-category").text("카테고리 선택");
			$("#btn-txt-add-location").text("지역 선택");
			$("#add-store_tel").val("");
			$("#add-store_price").val("");
			$("#add-store_parking").val("");
			$("#add-store_time").val("");
			$("#add-store_break").val("");
			$(".store_holiday-weekdays>button").removeClass("active");
			$(".store_holiday-no>button").removeClass("active");
			$("#add-store_website").val("");
			
			getCode("category", "add");
			getCode("location", "add");
		}
		else if (section === ".admin-update") {
			getCode("category", "upt");
			getCode("location", "upt");
			
			var storeId = jqElement.attr("store-id");
			
			$.ajax({
				url: "/admin/api/store/" + storeId,
				success: function(store) {
					$("#upt-store_id").val(store.store_id);
					$("#upt-store_name").val(store.store_name);
					$("#upt-branch_name").val(store.branch_name);
					
					$("#upt-store_img").val("");
					$(".btn-admin-file").html("<img src='" + store.store_img +
							"?ts=" + Date.now() + "'>");
					
					$("#upt-store_addr").val(store.store_addr);
					
					currentStore = {
						storeAddr: store.store_addr,
						storeLat: store.store_lat,
						storeLng: store.store_lng,
						categoryId: store.category_id,
						locationId: store.location_id,
					};
					
					var mapImageSrc = "https://maps.googleapis.com/maps/api/staticmap" +
						"?maptype=roadmap" +
						"&center=" + currentStore.storeLat + "," + currentStore.storeLng +
						"&markers=color:red|" + currentStore.storeLat + "," + currentStore.storeLng +
						"&zoom=16" +
						"&size=300x300" +
						"&key=AIzaSyAHX_Y_cP2i1v9lchEPJ4yROwzh9nK6of0";
					$("#upt-store_addr").parent("div").find("img").remove();
					$("#upt-store_addr").parent("div").append("<img src='" + mapImageSrc + "'>");
				
					$("#btn-txt-upt-category").text(store.category_name);
					$("#btn-txt-upt-location").text(store.location_name);
					
					$("#upt-store_tel").val(store.store_tel);
					$("#upt-store_price").val(store.store_price);
					$("#upt-store_parking").val(store.store_parking);
					$("#upt-store_time").val(store.store_time);
					$("#upt-store_break").val(store.store_break);
					$("#upt-store_website").val(store.store_website);
					
					$(".store_holiday-weekdays>button").removeClass("active");
					$(".store_holiday-no>button").removeClass("active");
					
					var storeHoliday = store.store_holiday;
					
					if (storeHoliday !== undefined && storeHoliday.length > 0) {
						if (storeHoliday === "no") {
							$(".admin-update .store_holiday-no>button").addClass("active");
						}
						else {
							var holidays = storeHoliday.split("|");
							
							for (var i=0; i<holidays.length; i++) {
								if (holidays[i] === "") {
									continue;
								}
								
								$(".admin-update .store_holiday-weekdays>button[day='" + holidays[i] + "']").addClass("active");
							}
						}
					}
				},
			});
		}
	};
	
	function loadList(page) {
		currentPage = page;
		
		$.ajax({
			url: "/admin/api/store/list",
			data: {
				page: page,
				rowsPerPage: rowsPerPage,
			},
			success: function(result) {
				var list = result.list;
				var count = result.count;
				
				var itemHTML = "";
				var storeNo = (currentPage - 1) * rowsPerPage;
				
				for (var i=0; i<list.length; i++) {
					var item = list[i];
					
					itemHTML += "<tr store-id='" + item.store_id + "'>";
					itemHTML += "<td>" + (++storeNo) + "</td>";
					itemHTML += "<td>" + item.category_name + "</td>";
					itemHTML += "<td>" + item.location_name + "</td>";
					itemHTML += "<td>" + item.store_name + "</td>";
					itemHTML += "<td>" + item.store_score + "</td>";
					itemHTML += "</tr>";
				}
				
				$(".admin-list table>tbody").html(itemHTML);
				$(".admin-list table>tbody>tr").on("click", function() {
					common.showSection(".admin-update", $(this), handler);
				});
				
				// for Paging
				var firstPage = 1;
				var lastPage = parseInt(count / rowsPerPage)
					+ (count % rowsPerPage === 0 ? 0 : 1);
				
				var pagingHTML = "";
				
				pagingHTML += "<li page='" + firstPage + "'>";
				pagingHTML += "<a href='#'><i class='fa fa-fw fa-fast-backward'></i></a></li>";
				
				var startPage = parseInt((currentPage-1) / pagesPerPaging)
					* pagesPerPaging + 1;
				var endPage = Math.min(startPage + (pagesPerPaging - 1), lastPage);
				
				if (startPage > 1) {
					pagingHTML += "<li page='" + (startPage - 1) + "'>";
					pagingHTML += "<a href='#'><i class='fa fa-fw fa-step-backward'></i></a></li>";
				}
				
				for (var i=startPage; i<=endPage; i++) {
					pagingHTML += "<li page='" + i + "'";
					
					if (i === currentPage) {
						pagingHTML += " class='active'";
					}
					
					pagingHTML += "><a href='#'>" + i + "</a></li>";
				}
				
				if (endPage < lastPage) {
					pagingHTML += "<li page='" + (endPage + 1) + "'>";
					pagingHTML += "<a href='#'><i class='fa fa-fw fa-step-forward'></i></a></li>";
				}
				
				pagingHTML += "<li page='" + lastPage + "'>";
				pagingHTML += "<a href='#'><i class='fa fa-fw fa-fast-forward'></i></a></li>";
				
				$(".admin-paging").html(pagingHTML);
				$(".admin-paging>li>a").on("click", function(event) {
					event.preventDefault();
					
					var page = parseInt($(this).parent("li").attr("page"));
					
					loadList(page);
				});
			},
		});
	}
	
	$(".btn-addr").on("click", function() {
		var jusoPop = window.open("/admin/juso#ready","jusoPop",
				"width=570,height=420, scrollbars=yes");
		
		var addrInput = $("#" + $(this).attr("for"));
		
		window.jusoCallback = function(addr, geoInfo) {
			addrInput.val(addr);
			
			currentStore.storeAddr = addr;
			currentStore.storeLat = geoInfo.results[0].geometry.location.lat;
			currentStore.storeLng = geoInfo.results[0].geometry.location.lng;
			
			var mapImageSrc = "https://maps.googleapis.com/maps/api/staticmap" +
					"?maptype=roadmap" +
					"&center=" + currentStore.storeLat + "," + currentStore.storeLng +
					"&markers=color:red|" + currentStore.storeLat + "," + currentStore.storeLng +
					"&zoom=16" +
					"&size=300x300" +
					"&key=AIzaSyAHX_Y_cP2i1v9lchEPJ4yROwzh9nK6of0";
			
			addrInput.parent("div").find("img").remove();
			addrInput.parent("div").append("<img src='" + mapImageSrc + "'>");
		};
	});
	
	$(".store_holiday-weekdays>button").on("click", function() {
		$(".store_holiday-no>button").removeClass("active");
		$(this).toggleClass("active");
	});
	
	$(".store_holiday-no>button").on("click", function() {
		$(".store_holiday-weekdays>button").removeClass("active");
		$(this).addClass("active");
	});
	
	$(".btn-admin-update").on("click", function() {
		var storeId = $("#upt-store_id").val();
		var storeName = $("#upt-store_name").val().trim();
		var branchName = $("#upt-branch_name").val().trim();
		var storeImg = $("#upt-store_img").val();
		var storeTel = $("#upt-store_tel").val().trim();
		var storePrice = $("#upt-store_price").val().trim();
		var storeParking = $("#upt-store_parking").val().trim();
		var storeTime = $("#upt-store_time").val().trim();
		var storeBreak = $("#upt-store_break").val().trim();
		var storeWebsite = $("#upt-store_website").val().trim();

		if (storeName === "") {
			alert("맛집명을 입력하세요.");
			$("#upt-store_name").focus();
			return;
		}
		
		var formData = new FormData();
		formData.append("storeName", storeName);
		formData.append("branchName", branchName);
		formData.append("storeAddr", currentStore.storeAddr);
		formData.append("storeLat", currentStore.storeLat);
		formData.append("storeLng", currentStore.storeLng);
		formData.append("categoryId", currentStore.categoryId);
		formData.append("locationId", currentStore.locationId);
		formData.append("storeTel", storeTel);
		formData.append("storePrice", storePrice);
		formData.append("storeParking", storeParking);
		formData.append("storeTime", storeTime);
		formData.append("storeBreak", storeBreak);
		formData.append("storeWebsite", storeWebsite);
		
		if (storeImg !== "") {
			var files = $("#upt-store_img")[0].files;
			
			formData.append("storeImg", files[0]);
		}
		
		var storeHoliday = "";
		
		if ($(".admin-update .store_holiday-no>button").hasClass("active")) {
			storeHoliday = "no";
		}
		else {
			var holidays = $(".admin-update .store_holiday-weekdays>button.active");
			
			for (var i=0; i<holidays.length; i++) {
				storeHoliday += $(holidays[i]).attr("day") + "|";
			}
		}
		
		formData.append("storeHoliday", storeHoliday);
		
		$.ajax({
			url: "/admin/api/store/" + storeId,
			method: "POST",
			data: formData,
			processData: false,
			contentType: false,
			success: function() {
				common.showSection(".admin-list", null, handler);
			},
			error: function() {
				alert("수정에 실패했습니다.");
			},
		});
	});
	
	$(".btn-admin-save").on("click", function() {
		var storeName = $("#add-store_name").val().trim();
		var branchName = $("#add-branch_name").val().trim();
		var storeImg = $("#add-store_img").val();
		var storeTel = $("#add-store_tel").val().trim();
		var storePrice = $("#add-store_price").val().trim();
		var storeParking = $("#add-store_parking").val().trim();
		var storeTime = $("#add-store_time").val().trim();
		var storeBreak = $("#add-store_break").val().trim();
		var storeWebsite = $("#add-store_website").val().trim();
		
		if (storeName === "") {
			alert("맛집명을 입력하세요.");
			$("#add-store_name").focus();
			return;
		}
		else if (storeImg === "") {
			alert("대표이미지를 선택하세요.");
			return;
		}
		else if (!currentStore.storeAddr) {
			alert("주소를 입력하세요.");
			return;
		}
		else if (!currentStore.categoryId) {
			alert("카테고리를 선택하세요.");
			return;
		}
		else if (!currentStore.locationId) {
			alert("지역을 선택하세요.");
			return;
		}
		
		var formData = new FormData();
		formData.append("storeName", storeName);
		formData.append("branchName", branchName);
		formData.append("storeAddr", currentStore.storeAddr);
		formData.append("storeLat", currentStore.storeLat);
		formData.append("storeLng", currentStore.storeLng);
		formData.append("categoryId", currentStore.categoryId);
		formData.append("locationId", currentStore.locationId);
		formData.append("storeTel", storeTel);
		formData.append("storePrice", storePrice);
		formData.append("storeParking", storeParking);
		formData.append("storeTime", storeTime);
		formData.append("storeBreak", storeBreak);
		formData.append("storeWebsite", storeWebsite);
		
		var storeHoliday = "";
		
		if ($(".admin-add .store_holiday-no>button").hasClass("active")) {
			storeHoliday = "no";
		}
		else {
			var holidays = $(".admin-add .store_holiday-weekdays>button.active");
			
			for (var i=0; i<holidays.length; i++) {
				storeHoliday += $(holidays[i]).attr("day") + "|";
			}
		}
		
		formData.append("storeHoliday", storeHoliday);
		
		var files = $("#add-store_img")[0].files;
		
		formData.append("storeImg", files[0]);
		
		$.ajax({
			url: "/admin/api/store/add",
			method: "POST",
			data: formData,
			processData: false,
			contentType: false,
			success: function() {
				common.showSection(".admin-list", null, handler);
			},
			error: function() {
				alert("저장에 실패했습니다.");
			},
		});
	});
	
	$(".btn-admin-delete").on("click", function() {
		var categoryId = $("#upt-store_id").val();
		
		$.ajax({
			url: "/admin/api/store/" + categoryId,
			method: "DELETE",
			success: function() {
				common.showSection(".admin-list", null, handler);
			},
			error: function() {
				alert("삭제에 실패했습니다.");
			},
		});
	});
	
	common.initMgmt(handler);
});







