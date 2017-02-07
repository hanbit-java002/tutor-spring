package com.hanbit.hp.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MemberDAO {

	@Autowired
	private SqlSession sqlSession;
	
	public int insertMember(String uid, String userId, String userPw) {
		Map param = new HashMap();
		param.put("uid", uid);
		param.put("userId", userId);
		param.put("userPw", userPw);
		
		return sqlSession.insert("member.insertMember", param);
	}

	public String selectUserPw(String userId) {

		return sqlSession.selectOne("member.selectUserPw", userId);
	}
	
}












