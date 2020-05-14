package com.acsc.api.service;

import com.acsc.api.entity.UserActivity;
import com.acsc.commons.vo.ResultVO;

public interface ActivityService {

    /**
     * 获取活动列表
     * @param page
     * @param limit
     * @return
     */
    ResultVO getActivityList(Integer page, Integer limit,String orderby);


    /**
     * 根据ID获取活动
     * @param userId
     * @param activityId
     * @return
     */
    ResultVO getActivityById(String userId,String activityId);


    /**
     * 搜索活动列表
     * @param page
     * @param limit
     * @return
     */
    ResultVO queryByKeyword(Integer page, Integer limit,String keyword);

    /**
     * 添加用户活动订单
     * @param userActivity
     * @return
     */
    ResultVO addUserActivity(UserActivity userActivity);

    /**
     * 查询用户活动订单
     * @param userId
     * @param page
     * @param limit
     * @param orderby
     * @return
     */
    ResultVO queryUserActivity(String userId,Integer page, Integer limit,String orderby);
}
