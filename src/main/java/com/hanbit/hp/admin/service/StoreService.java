package com.hanbit.hp.admin.service;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hanbit.hp.admin.dao.StoreDAO;
import com.hanbit.hp.service.FileService;
import com.hanbit.hp.util.KeyUtils;

@Service
public class StoreService {
	
	@Autowired
	private FileService fileService;
	
	@Autowired
	private StoreDAO storeDAO;

	@Transactional
	public int add(String storeName,
			String categoryId, String locationId,
			MultipartFile storeImgFile) {
		
		String storeId = KeyUtils.generateKey("STO");
		String storeImg = "/api2/file/" + storeId;		
		
		int result = storeDAO.insert(storeId, storeName, storeImg, categoryId, locationId);
		
		fileService.addAndSave(storeId, storeImgFile);
		
		return result;
	}
	
}








