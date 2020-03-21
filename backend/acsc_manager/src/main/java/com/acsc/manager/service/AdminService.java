package com.acsc.manager.service;

import com.acsc.commons.entity.Admin;
import com.acsc.commons.vo.ResultVO;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

public interface AdminService {

    ResultVO login(String username, String passwd);

    ResultVO add(Admin admin);

    ResultVO modifyInfo(Admin admin);

    ResultVO modifyPasswd(String passwd);

    ResultVO modifyStatus(String adminId, Integer status);

    Map<String,Object> getAdminList(Integer page, Integer limit);

    Admin getAdminById(String adminId);

    ResultVO remove(String adminId);

}
