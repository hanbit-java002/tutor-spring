package com.hanbit.hp.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

	@RequestMapping("/api2/main/imgs")
	public List<String> getMainImgs() {
		List<String> mainImgs = new ArrayList<>();
		mainImgs.add("img/main0.jpg");
		mainImgs.add("img/main1.jpg");
		mainImgs.add("img/main2.jpg");
		
		return mainImgs;
	}
	
}
