package com.hanbit.hp.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hanbit.hp.admin.service.CategoryService;

@RestController
@RequestMapping("/admin/api/category")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;

	@RequestMapping("/list")
	public List list() {
		
		return categoryService.getList();
	}
	
}
