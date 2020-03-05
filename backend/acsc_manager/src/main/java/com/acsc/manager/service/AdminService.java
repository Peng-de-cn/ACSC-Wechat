package com.acsc.manager.service;

import com.acsc.commons.entity.Admin;
import com.acsc.commons.vo.ResultVO;
import org.apache.ibatis.annotations.Param;

public interface AdminService {

    ResultVO login(String username, String passwd);

    ResultVO add(Admin admin);

    ResultVO modifyInfo(Admin admin);

    ResultVO modifyPasswd(String adminId, String passwd);

}
