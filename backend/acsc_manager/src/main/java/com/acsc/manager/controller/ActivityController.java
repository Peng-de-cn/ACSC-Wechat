package com.acsc.manager.controller;


import com.acsc.commons.entity.Activity;
import com.acsc.commons.vo.ResultVO;
import com.acsc.manager.service.ActivityService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;

@RestController
@RequestMapping("/activity")
public class ActivityController {

    @Resource
    private ActivityService activityService;

    @RequestMapping("list")
    public Map<String,Object> list(Integer page,Integer limit){
        return activityService.getActivityList(page,limit);
    }

    @RequestMapping("add")
    public ResultVO add(Activity activity){
        return activityService.add(activity);
    }

    @RequestMapping("del")
    public ResultVO del(String activityId){
        return activityService.remove(activityId);
    }

    @RequestMapping("update")
    public ResultVO update(Activity activity){

        return activityService.modify(activity);

    }

    @RequestMapping("getUserList")
    public Map<String,Object> getUserList(String activityId,Integer page,Integer limit){
        return activityService.getUsersForActivity(activityId, page, limit);
    }

}
