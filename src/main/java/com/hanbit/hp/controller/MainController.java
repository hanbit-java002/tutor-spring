package com.hanbit.hp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hanbit.hp.service.MainService;

@RestController
public class MainController {
	
	@Autowired
	private MainService mainService;
	
	@RequestMapping("/api2/main/imgs")
	public List<String> getMainImgs() {
		return mainService.getMainImgs();
	}
	
}
