package com.acsc.manager.controller;


import com.acsc.commons.entity.Admin;
import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.service.AdminService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {


    @Resource
    private AdminService adminService;

    @RequestMapping("login")
    public ResultVO login(String username, String passwd){
        return adminService.login(username,passwd);
    }

    @RequestMapping("resetPwd")
    public ResultVO resetPwd(String passwd){
        return adminService.modifyPasswd(passwd);
    }

    @RequestMapping("list")
    public Map<String,Object> list(Integer page, Integer limit){
        return adminService.getAdminList(page, limit);
    }

    @RequestMapping("add")
    public ResultVO add(Admin admin){
        return adminService.add(admin);
    }

    @RequestMapping("updateStatus")
    public ResultVO updateStatus(String adminId, Integer status){
        return adminService.modifyStatus(adminId, status);
    }

    @RequestMapping("delete")
    public ResultVO delete(String adminId){
        return adminService.remove(adminId);
    }

    @RequestMapping("update")
    public ResultVO update(Admin admin){
        return adminService.modifyInfo(admin);
    }


}
