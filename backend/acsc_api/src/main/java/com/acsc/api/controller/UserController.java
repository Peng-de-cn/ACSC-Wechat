package com.acsc.api.controller;


import com.acsc.api.service.UserService;
import com.acsc.commons.entity.User;
import com.acsc.commons.vo.ResultVO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/user")
public class UserController {


    @Resource
    private UserService userService;

    @RequestMapping("firstregist")
    public ResultVO firstregist(User user){
        return userService.insertUser(user);
    }

}
