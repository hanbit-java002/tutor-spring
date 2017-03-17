package com.hanbit.hp.admin.controller;

import java.net.URI;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	public RestTemplate restTemplate;

	@RequestMapping("")
	public String main(Model model) {
		model.addAttribute("cssName", "main");
		model.addAttribute("jsName", "main");
		
		return "admin/index";
	}
	
	@RequestMapping("/{menuId}")
	public String menu(Model model, @PathVariable("menuId") String menuId) {
		model.addAttribute("menuId", menuId);
		
		String cssName = "main";
		
		if ("store".equals(menuId)) {
			cssName = menuId;
		}
		
		model.addAttribute("cssName", cssName);
		model.addAttribute("jsName", menuId);
		
		return "admin/" + menuId;
	}
	
	@RequestMapping("/juso")
	public String juso(HttpServletRequest request,
			Model model) {
		
		Enumeration<String> paramNames = request.getParameterNames();
		
		while (paramNames.hasMoreElements()) {
			String paramName = paramNames.nextElement();
			String paramValue = request.getParameter(paramName);
			
			model.addAttribute(paramName, paramValue);
			
			if ("roadAddrPart1".equals(paramName)) {
				String url = "https://maps.googleapis.com/maps/api/geocode/json";
				String key = "AIzaSyAHX_Y_cP2i1v9lchEPJ4yROwzh9nK6of0";
				
				URI uri = UriComponentsBuilder.fromHttpUrl(url)
					.queryParam("address", paramValue)
					.queryParam("key", key)
					.build()
					.toUri();
				
				String geoInfo = restTemplate.getForObject(uri, String.class);
				
				model.addAttribute("geoInfo", geoInfo);
			}
		}
		
		return "admin/juso";
	}
	
}













