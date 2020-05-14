package com.acsc.api.controller;


import com.acsc.api.entity.UserActivity;
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
    public ResultVO getOneActivity(String userId, String activityId){
        return activityService.getActivityById(userId,activityId);
    }

    @RequestMapping("queryByKeyword")
    public ResultVO queryByKeyword(Integer page, Integer limit, String keyword){
        return activityService.queryByKeyword(page,limit,keyword);
    }
    @RequestMapping("addUserActivity")
    public ResultVO addUserActivity(UserActivity userActivity){
        return activityService.addUserActivity(userActivity);
    }

    @RequestMapping("queryUserActivity")
    public ResultVO queryUserActivity(String userId, Integer page, Integer limit, String orderby){
        return activityService.queryUserActivity(userId, page, limit, orderby);
    }

}
