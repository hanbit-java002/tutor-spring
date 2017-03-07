package com.hanbit.hp.admin;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

	@RequestMapping("")
	public String main(Model model) {
		model.addAttribute("cssName", "main");
		model.addAttribute("jsName", "main");
		
		return "admin/index";
	}
	
}
