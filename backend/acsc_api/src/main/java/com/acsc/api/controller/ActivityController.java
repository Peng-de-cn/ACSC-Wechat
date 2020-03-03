package com.acsc.api.controller;


import com.acsc.api.service.ActivityService;
import com.acsc.commons.vo.ResultVO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/activity")
public class ActivityController {


    @Resource
    private ActivityService activityService;

    @RequestMapping("getActivityList")
    public ResultVO getActivityList(Integer page, Integer limit ,String orderby){
        return activityService.getActivityList(page,limit,orderby);
    }
    @RequestMapping("getOneActivity")
    public ResultVO getOneActivity(String activityId){
        return activityService.getActivityById(activityId);
    }

}
