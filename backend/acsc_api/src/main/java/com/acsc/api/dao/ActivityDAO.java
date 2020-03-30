package com.acsc.api.dao;

import com.acsc.api.entity.Activitys;
import com.acsc.api.entity.Activity;
import com.acsc.api.entity.UserActivity;
import com.acsc.api.entity.UserActivityVO;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ActivityDAO {

    List<Activitys> queryAll(@Param("begin") Integer begin, @Param("limit") Integer limit, @Param("orderby") String orderby);

    Activity queryByActivityId(String activityId);

    Integer queryActivityNum();

    Integer queryUserActivityNum(@Param("userId") String userId);

    List<Activitys> queryByKeyword(@Param("begin") Integer begin, @Param("limit") Integer limit, @Param("keyword") String keyword);

    Integer queryActivityNumByKeyword(@Param("keyword") String keyword);

    void insertUserActivity(UserActivity userActivity);

    BigDecimal queryPackagePrice(String packageId);

    List<UserActivityVO> queryUserActivity(@Param("userId") String userId, @Param("begin") Integer begin, @Param("limit") Integer limit, @Param("orderby") String orderby);


}
