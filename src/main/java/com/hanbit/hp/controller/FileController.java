package com.hanbit.hp.controller;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FileController {

	@RequestMapping("/api2/file/{fileId}")
	public void getFile(@PathVariable("fileId") String fileId,
			HttpServletResponse response) throws Exception {
		
		String filePath = "/hanbit/upload/" + fileId;
		File file = new File(filePath);
		FileInputStream fis = new FileInputStream(file);
		
		response.setContentType("image/jpeg");
		response.setContentLength(107178);

		BufferedInputStream bis = IOUtils.buffer(fis);
		
		while (bis.available() > 0) {
			byte[] buffer = new byte[4096];
			int length = bis.read(buffer);
			
			response.getOutputStream().write(buffer, 0, length);
		}
		
		response.flushBuffer();
	}
	
}








