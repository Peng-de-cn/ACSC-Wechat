package com.acsc.manager.service;

import com.acsc.commons.entity.Activity;
import com.acsc.commons.vo.ResultVO;

import java.util.Map;

public interface ActivityService {

    /**
     * 获取活动列表
     * @param page
     * @param limit
     * @return
     */
    Map<String,Object> getActivityList(Integer page, Integer limit, String title, String clubId);

    /**
     * 根据ID获取活动
     * @param activityId
     * @return
     */
    Activity getActivityById(String activityId);

    /**
     * 添加活动
     * @param activity
     * @return
     */
    ResultVO add(Activity activity);

    /**
     * 根据ID删除活动
     * @param activityId
     * @return
     */
    ResultVO remove(String activityId);

    /**
     * 更新活动信息
     * @param activity
     * @return
     */
    ResultVO modify(Activity activity);

    /**
     * 获取活动用户
     * @param activityId
     * @param page
     * @param limit
     * @return
     */
    Map<String,Object> getUsersForActivity(String activityId, Integer page, Integer limit);

    /**
     * 获取活动总数
     * @return
     */
    Integer getActivityNum();

}
