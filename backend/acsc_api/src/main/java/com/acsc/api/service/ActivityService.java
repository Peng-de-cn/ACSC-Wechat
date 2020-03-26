package com.acsc.api.service;

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
}
