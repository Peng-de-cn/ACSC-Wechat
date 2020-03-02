package com.acsc.manager.service;

import com.acsc.commons.vo.ResultVO;

public interface AdminService {

    ResultVO login(String username, String passwd);

    void logout();

}
