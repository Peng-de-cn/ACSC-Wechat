package com.acsc.api.service;

import com.acsc.commons.entity.User;
import com.acsc.commons.vo.ResultVO;

public interface UserService {

    ResultVO insertUser (User user);
    ResultVO updateUserById (User user);
    ResultVO queryUserById (String userId);
}
