package com.hanbit.hp.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hanbit.hp.admin.dao.CategoryDAO;

@Service
public class CategoryService {

	@Autowired
	private CategoryDAO categoryDAO;
	
	public List getList() {
		return categoryDAO.selectList();
	}
	
}
