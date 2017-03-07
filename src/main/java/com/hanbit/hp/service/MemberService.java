package com.hanbit.hp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hanbit.hp.dao.MemberDAO;
import com.hanbit.hp.util.KeyUtils;

@Service
public class MemberService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberService.class);

	private static final String SECRET_KEY = "hanbit";
	private PasswordEncoder passwordEncoder = new StandardPasswordEncoder(SECRET_KEY);
	
	@Autowired
	private MemberDAO memberDAO;
	
	@Transactional
	public String addMember(String userId, String userPw) {
		String uid = KeyUtils.generateKey("UID");
		String encryptedUserPw = passwordEncoder.encode(userPw);
		
		memberDAO.insertMember(uid, userId, encryptedUserPw);
		memberDAO.insertMemberDetail(uid, "사용자");
		
		return uid;
	}

	public boolean isValidMember(String userId, String userPw) {
		String encryptedUserPw = memberDAO.selectUserPw(userId);
		
		return passwordEncoder.matches(userPw, encryptedUserPw);
	}

	public void modifyMember(String uid, String userPw) {
		String encryptedUserPw = passwordEncoder.encode(userPw);
		
		memberDAO.updateMember(uid, encryptedUserPw);
	}

	public String getUid(String userId) {
		return memberDAO.selectUid(userId);
	}
	
}










