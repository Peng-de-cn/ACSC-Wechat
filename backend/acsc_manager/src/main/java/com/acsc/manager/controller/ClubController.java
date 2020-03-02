package com.acsc.manager.controller;


import com.acsc.commons.entity.Club;
import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.service.ClubService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

@RestController
@RequestMapping("/club")
public class ClubController {

    @Resource
    private ClubService clubService;

    @RequestMapping("list")
    public Map<String,Object> list(Integer page, Integer limit){
        return clubService.getClubList(page, limit);
    }

    @RequestMapping("add")
    public ResultVO add(Club club){
        return clubService.add(club);
    }

    @RequestMapping("update")
    public ResultVO update(Club club){
        return clubService.modify(club);
    }

    @RequestMapping("del")
    public ResultVO del(String clubId){
        return clubService.remove(clubId);
    }


}
