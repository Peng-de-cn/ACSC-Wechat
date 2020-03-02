package com.acsc.manager.dao;

import com.acsc.commons.entity.Activity;
import com.acsc.manager.vo.UserActivityVO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ActivityDAO {

    List<Activity> queryAll(@Param("begin") Integer begin, @Param("limit") Integer limit);

    Activity queryByActivityId(String activityId);

    Integer queryActivityNum();

    void insert(Activity activity);

    void delByActivityId(String activityId);

    void updateActivityById(Activity activity);

    List<UserActivityVO> queryUserByActivityId(@Param("activityId") String activityId, @Param("begin") Integer begin, @Param("limit") Integer limit);

    Integer queryUsersActivityNum(String activityId);

}
