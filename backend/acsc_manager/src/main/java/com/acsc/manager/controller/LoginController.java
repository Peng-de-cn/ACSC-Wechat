package com.acsc.manager.controller;

import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.service.AdminService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
public class LoginController {

    @Resource
    private AdminService adminService;

    @RequestMapping("/")
    public String redirectIndex() {
        return "redirect:/view/index";
    }

    @RequestMapping("/login")
    public String login(String username, String passwd){

        System.out.println("用户登录");

        ResultVO resultVO = adminService.login(username, passwd);

        return "redirect:/view/index";
    }

}
