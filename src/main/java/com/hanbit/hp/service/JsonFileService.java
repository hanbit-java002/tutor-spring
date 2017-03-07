package com.hanbit.hp.service;

import java.io.InputStream;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class JsonFileService {
	
	private static ObjectMapper mapper = new ObjectMapper();

	public <T> T getJsonFile(String filePath, Class<T> classType) throws Exception {
		InputStream jsonStream 
			= getClass().getClassLoader().getResourceAsStream(filePath);
		
		return mapper.readValue(jsonStream, classType);
	}
	
}
