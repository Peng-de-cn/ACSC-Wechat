package com.acsc.manager.controller;


import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.service.AdminService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/admin")
public class AdminController {


    @Resource
    private AdminService adminService;

    @RequestMapping("login")
    public ResultVO login(String username, String passwd){
        return adminService.login(username,passwd);
    }

}
