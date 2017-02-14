package com.hanbit.hp.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hanbit.hp.annotation.SignInRequired;
import com.hanbit.hp.service.MemberService;

@Controller
public class MemberController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private MemberService memberService;

	@RequestMapping(value="/api2/member/signup", method=RequestMethod.POST)
	@ResponseBody
	public Map signup(@RequestParam("userId") String userId,
			@RequestParam("userPw") String userPw) {
		
		if (StringUtils.isBlank(userId)) {
			throw new RuntimeException("아이디가 잘못 입력되었습니다.");
		}
		else if (StringUtils.isBlank(userPw)) {
			throw new RuntimeException("비밀번호가 잘못 입력되었습니다.");
		}
		
		String uid = memberService.addMember(userId, userPw);
		
		Map result = new HashMap();
		result.put("result", "ok");
		result.put("uid", uid);
		
		return result;
	}
	
	@RequestMapping(value="/api2/member/signin", method=RequestMethod.POST)
	@ResponseBody
	public Map signin(@RequestParam("userId") String userId,
			@RequestParam("userPw") String userPw,
			HttpSession session) {
		
		try {
			if (!memberService.isValidMember(userId, userPw)) {
				LOGGER.warn("패스워드 틀림 : " + userId + " / " + userPw);
				
				throw new RuntimeException("패스워드가 다릅니다.");
			}
		}
		catch (NullPointerException e) {
			throw new RuntimeException("가입되지 않은 사용자입니다.");
		}
		
		String uid = memberService.getUid(userId);
		
		session.setAttribute("signedIn", true);
		session.setAttribute("uid", uid);
		session.setAttribute("userId", userId);
		
		Map result = new HashMap();
		result.put("result", "ok");
		
		return result;
	}
	
	@RequestMapping("/api2/member/signedin")
	@ResponseBody
	public Map signedin(HttpSession session) {
		Map result = new HashMap();
		String signedIn = "no";
		
		if (session.getAttribute("signedIn") != null &&
				(Boolean) session.getAttribute("signedIn")) {
			signedIn = "yes";
			
			result.put("userId", session.getAttribute("userId"));
		}
		
		result.put("result", signedIn);
		
		return result;
	}
	
	@RequestMapping(value="/api2/member/update", method=RequestMethod.POST)
	@ResponseBody
	@SignInRequired
	public Map update(@RequestParam("userPw") String userPw,
			HttpSession session) {
		
		String uid = (String) session.getAttribute("uid");
		
		memberService.modifyMember(uid, userPw);
		
		Map result = new HashMap();
		result.put("result", "ok");
		
		return result;
	}
	
	@RequestMapping("/api2/member/signout")
	@ResponseBody
	public Map signout(HttpSession session) {
		
		session.invalidate();
		
		Map result = new HashMap();
		result.put("result", "ok");
		
		return result;
	}
	
}













