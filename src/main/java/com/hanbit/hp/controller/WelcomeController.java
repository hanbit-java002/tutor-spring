package com.hanbit.hp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class WelcomeController {
	
	@RequestMapping("/form")
	public String form() {
		return "hello";
	}
	
	@RequestMapping("/api2/calc")
	@ResponseBody
	public Map calculate(@RequestParam(name="operator", required=false) String operator,
			@RequestParam(name="left", required=false) String leftStr,
			@RequestParam(name="right", required=false) String rightStr) {
		int left = 0;
		int right = 0;
		int result = 0;
		
		try {
			left = Integer.valueOf(leftStr);
			right = Integer.valueOf(rightStr);
		}
		catch (Exception e) {
			
		}		
		
		if ("plus".equals(operator)) {
			result = left + right;
		}
		else if ("minus".equals(operator)) {
			result = left - right;
		}
		else if ("multiply".equals(operator)) {
			result = left * right;
		}
		
		Map map = new HashMap();
		map.put("result", result);
		
		return map;
	}

	@RequestMapping("/")
	@ResponseBody
	public Map welcome() {
		Map welcome = new HashMap();
		welcome.put("msg", "Hello, Hanbit Plate");
		
		return welcome;
	}
	
	@RequestMapping("/api2/hello")
	@ResponseBody
	public List api() {
		List list = new ArrayList();
		list.add("Hanbit");
		list.add("Plate");
		list.add("API");
		
		return list;
	}
	
}
