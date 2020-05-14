package com.acsc.api.controller;


import com.acsc.api.service.ClubService;
import com.acsc.commons.vo.ResultVO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/club")
public class ClubController {

    @Resource
    private ClubService clubService;

    @RequestMapping("getlist")
    public ResultVO getlist(Integer page, Integer limit){
        return clubService.getClubList(page, limit);
    }

}
