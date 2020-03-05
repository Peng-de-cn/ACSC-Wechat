package com.acsc.manager.controller;


import com.acsc.commons.entity.User;
import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;

    @RequestMapping("list")
    public Map<String,Object> list(Integer page, Integer limit, String vipNum, String clubId, String mobile){
        return userService.getUserList(page, limit, vipNum, clubId, mobile);
    }

    @RequestMapping("add")
    public ResultVO add(User user){

        return userService.add(user);

    }

    @RequestMapping("update")
    public ResultVO update(User user){

        return userService.modify(user);
    }

}
