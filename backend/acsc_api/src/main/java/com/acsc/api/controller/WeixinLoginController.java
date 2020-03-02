package com.acsc.api.controller;


import com.acsc.api.service.WeixinLoginService;
import com.acsc.commons.vo.ResultVO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/weixinLogin")
public class WeixinLoginController {


    @Resource
    private WeixinLoginService weixinLoginService;

    @RequestMapping("login")
    public ResultVO login(String jscode){
        return weixinLoginService.login(jscode);
    }

}
