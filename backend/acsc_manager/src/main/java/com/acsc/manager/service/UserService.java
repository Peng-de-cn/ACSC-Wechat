package com.acsc.manager.service;

import com.acsc.commons.entity.User;
import com.acsc.commons.vo.ResultVO;

import java.util.Map;

public interface UserService {

    Map<String,Object> getUserList(Integer page, Integer limit, String vipNum, String clubId, String mobile);

    User getUserById(String userId);

    ResultVO add(User user);

    ResultVO modify(User user);

}
